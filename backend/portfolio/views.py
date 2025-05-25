from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import User, Experience, ClientFriendReview, Project, ProjectImage
from .serializers import (
    UserSerializer, UserBasicSerializer, ExperienceSerializer,
    ClientFriendReviewSerializer, ProjectSerializer, ProjectImageSerializer,
    CustomTokenObtainPairSerializer
)

# ======================== JWT AUTHENTICATION VIEWS ========================

class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token view with user data"""
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register new user and return JWT tokens"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            'message': 'User registered successfully',
            'user': UserBasicSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(access_token),
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logout user by blacklisting refresh token"""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

# ======================== USER VIEWS ========================

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, and delete user profile"""
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        return UserBasicSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def update(self, request, *args, **kwargs):
        """Handle both PUT and PATCH requests"""
        partial = kwargs.pop('partial', False)
        if request.method == 'PATCH':
            partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_portfolio_data(request):
    """Get complete portfolio data"""
    try:
        user = User.objects.first()  # Since you're the only user
        if not user:
            return Response({'message': 'Portfolio not found'}, status=404)
        
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# ======================== EXPERIENCE VIEWS ========================

class ExperienceListCreateView(generics.ListCreateAPIView):
    """List all experiences or create new experience"""
    serializer_class = ExperienceSerializer
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Experience.objects.filter(user=self.request.user)
        return Experience.objects.all()
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete experience"""
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        """Handle both PUT and PATCH requests"""
        partial = kwargs.pop('partial', False)
        if request.method == 'PATCH':
            partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

# Function-based views for experiences (alternative approach)
@api_view(['GET', 'POST'])
def experience_list_create(request):
    """Get all experiences or create new experience"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            experiences = Experience.objects.filter(user=request.user)
        else:
            experiences = Experience.objects.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, 
                          status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def experience_detail(request, pk):
    """Get, update, or delete experience"""
    experience = get_object_or_404(Experience, pk=pk, user=request.user)
    
    if request.method == 'GET':
        serializer = ExperienceSerializer(experience)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        serializer = ExperienceSerializer(experience, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        experience.delete()
        return Response({'message': 'Experience deleted successfully'}, 
                       status=status.HTTP_204_NO_CONTENT)

# ======================== REVIEW VIEWS ========================

class ReviewListCreateView(generics.ListCreateAPIView):
    """List all reviews or create new review"""
    queryset = ClientFriendReview.objects.all()
    serializer_class = ClientFriendReviewSerializer
    permission_classes = [AllowAny]  # Anyone can view and create reviews
    
    def perform_create(self, serializer):
        # Assign to the portfolio owner (first user)
        user = User.objects.first()
        serializer.save(user=user)

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete review"""
    queryset = ClientFriendReview.objects.all()
    serializer_class = ClientFriendReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        """Handle both PUT and PATCH requests"""
        partial = kwargs.pop('partial', False)
        if request.method == 'PATCH':
            partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

# Function-based views for reviews
@api_view(['GET', 'POST'])
def review_list_create(request):
    """Get all reviews or create new review"""
    if request.method == 'GET':
        reviews = ClientFriendReview.objects.all()
        serializer = ClientFriendReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ClientFriendReviewSerializer(data=request.data)
        if serializer.is_valid():
            # Assign to the portfolio owner (first user)
            user = User.objects.first()
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def review_detail(request, pk):
    """Get, update, or delete review"""
    review = get_object_or_404(ClientFriendReview, pk=pk)
    
    if request.method == 'GET':
        serializer = ClientFriendReviewSerializer(review)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        serializer = ClientFriendReviewSerializer(review, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        review.delete()
        return Response({'message': 'Review deleted successfully'}, 
                       status=status.HTTP_204_NO_CONTENT)

# ======================== PROJECT VIEWS ========================

class ProjectListCreateView(generics.ListCreateAPIView):
    """List all projects or create new project"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete project"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def update(self, request, *args, **kwargs):
        """Handle both PUT and PATCH requests"""
        partial = kwargs.pop('partial', False)
        if request.method == 'PATCH':
            partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

# Function-based views for projects
@api_view(['GET', 'POST'])
def project_list_create(request):
    """Get all projects or create new project"""
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, 
                          status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def project_detail(request, pk):
    """Get, update, or delete project"""
    project = get_object_or_404(Project, pk=pk)
    
    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH', 'DELETE']:
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, 
                          status=status.HTTP_401_UNAUTHORIZED)
        
        if request.method in ['PUT', 'PATCH']:
            partial = request.method == 'PATCH'
            serializer = ProjectSerializer(project, data=request.data, partial=partial)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            project.delete()
            return Response({'message': 'Project deleted successfully'}, 
                           status=status.HTTP_204_NO_CONTENT)

# ======================== PROJECT IMAGE VIEWS ========================

class ProjectImageListCreateView(generics.ListCreateAPIView):
    """List all images for a project or add new image"""
    serializer_class = ProjectImageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        project = get_object_or_404(Project, pk=project_id, user=self.request.user)
        return ProjectImage.objects.filter(project=project)
    
    def perform_create(self, serializer):
        project_id = self.kwargs['project_id']
        project = get_object_or_404(Project, pk=project_id, user=self.request.user)
        serializer.save(project=project)

class ProjectImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete project image"""
    serializer_class = ProjectImageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        project_id = self.kwargs['project_id']
        image_id = self.kwargs['image_id']
        project = get_object_or_404(Project, pk=project_id, user=self.request.user)
        return get_object_or_404(ProjectImage, pk=image_id, project=project)
    
    def update(self, request, *args, **kwargs):
        """Handle both PUT and PATCH requests"""
        partial = kwargs.pop('partial', False)
        if request.method == 'PATCH':
            partial = True
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

# Function-based views for project images
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_image_list_create(request, project_id):
    """Get all images for a project or add new image"""
    project = get_object_or_404(Project, pk=project_id, user=request.user)
    
    if request.method == 'GET':
        images = ProjectImage.objects.filter(project=project)
        serializer = ProjectImageSerializer(images, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProjectImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def project_image_detail(request, project_id, image_id):
    """Get, update, or delete project image"""
    project = get_object_or_404(Project, pk=project_id, user=request.user)
    image = get_object_or_404(ProjectImage, pk=image_id, project=project)
    
    if request.method == 'GET':
        serializer = ProjectImageSerializer(image)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        partial = request.method == 'PATCH'
        serializer = ProjectImageSerializer(image, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        image.delete()
        return Response({'message': 'Image deleted successfully'}, 
                       status=status.HTTP_204_NO_CONTENT)