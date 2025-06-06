from rest_framework import serializers
from .models import Skill, Experience, Profile, Coding, Review, Tool, Project

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill_name']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'company_name', 'role', 'year']

class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'skills', 'experience', 'about', 'profile_image']

class CodingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coding
        fields = ['id', 'leetcode', 'geeksforgeeks', 'codingninja', 'others']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'reviewer_name', 'reviewed_platform', 'review', 'review_platform_image']

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ['id', 'tool_name']

class ProjectSerializer(serializers.ModelSerializer):
    tools = ToolSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'project_title', 'project_description', 'service', 'value', 'timeline',
            'project_hero_image', 'project_image_1', 'project_image_2', 'project_image_3',
            'project_intro_text', 'project_main_text', 'project_conclusion', 'tools'
        ]