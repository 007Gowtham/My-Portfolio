from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from .models import Profile,CodingPlatform,Testimonial,Project
from .Serializers import ProfileSerializer,CodingPlatformSerializer,TestimonialSerializer,ProjectSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

class CodingPlatformViewSet(viewsets.ModelViewSet):
    queryset = CodingPlatform.objects.all()
    serializer_class = CodingPlatformSerializer
    parser_classes = (MultiPartParser, FormParser,JSONParser)

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    parser_classes = (MultiPartParser, FormParser,JSONParser)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    parser_classes = (MultiPartParser, FormParser,JSONParser)