from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import Profile,CodingPlatform,Testimonial,Project
from .Serializers import ProfileSerializer,CodingPlatformSerializer,TestimonialSerializer,ProjectSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CodingPlatformViewSet(viewsets.ModelViewSet):
    queryset = CodingPlatform.objects.all()
    serializer_class = CodingPlatformSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer