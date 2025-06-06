from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Profile, Coding, Review, Project, Skill, Experience, Tool
from .serializer import ExperienceSerializer, ProfileSerializer, SkillSerializer, CodingSerializer, ReviewSerializer, ProjectSerializer, ToolSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser] # Removed 'post'

    @action(detail=True, methods=['post', 'delete'])
    def add_skill(self, request, pk=None):
        profile = self.get_object()
        
        if request.method == 'POST':
            serializer = SkillSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(profile=profile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            skill_id = request.data.get('skill_id')
            if not skill_id:
                return Response({"error": "skill_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                from .models import Skill
                skill = Skill.objects.get(id=skill_id, profile=profile)
                skill.delete()
                return Response({"message": "Skill deleted successfully"}, status=status.HTTP_200_OK)
            except Skill.DoesNotExist:
                return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post', 'delete'])
    def add_experience(self, request, pk=None):
        profile = self.get_object()
        
        if request.method == 'POST':
            serializer = ExperienceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(profile=profile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            experience_id = request.data.get('experience_id')
            if not experience_id:
                return Response({"error": "experience_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                from .models import Experience
                experience = Experience.objects.get(id=experience_id, profile=profile)
                experience.delete()
                return Response({"message": "Experience deleted successfully"}, status=status.HTTP_200_OK)
            except Experience.DoesNotExist:
                return Response({"error": "Experience not found"}, status=status.HTTP_404_NOT_FOUND)

class CodingViewSet(viewsets.ModelViewSet):
    queryset = Coding.objects.all()
    serializer_class = CodingSerializer
    http_method_names = ['get', 'put', 'patch', 'delete']  # Removed 'post'

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    http_method_names = ['get', 'put', 'patch', 'delete']  # Removed 'post'

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    http_method_names = ['get', 'put', 'patch', 'delete']  # Removed 'post'

    @action(detail=True, methods=['post', 'delete'])
    def add_tool(self, request, pk=None):
        project = self.get_object()
        
        if request.method == 'POST':
            tool_name = request.data.get('tool_name')
            if not tool_name:
                return Response({"error": "tool_name is required"}, status=status.HTTP_400_BAD_REQUEST)

            from .models import Tool
            try:
                tool = Tool.objects.create(project=project, tool_name=tool_name)
                serializer = ToolSerializer(tool)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": "Tool already exists or validation error"}, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            tool_id = request.data.get('tool_id')
            if not tool_id:
                return Response({"error": "tool_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                from .models import Tool
                tool = Tool.objects.get(id=tool_id, project=project)
                tool.delete()
                return Response({"message": "Tool deleted successfully"}, status=status.HTTP_200_OK)
            except Tool.DoesNotExist:
                return Response({"error": "Tool not found"}, status=status.HTTP_404_NOT_FOUND)

# Separate ViewSets for Skills, Experiences, and Tools
class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']