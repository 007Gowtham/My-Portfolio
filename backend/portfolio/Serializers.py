from rest_framework import serializers
from .models import (
    Profile, Skill, Internship,
    CodingPlatform, Testimonial,
    Project, Service, Tool, Value,
    Contact
)

# ---------------------------
# Skill & Internship
# ---------------------------
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency']
        read_only_fields = ['id']


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ['id', 'about', 'company', 'year', 'role']
        read_only_fields = ['id']


# ---------------------------
# Profile
# ---------------------------
class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    internships = InternshipSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'about', 'image', 'skills', 'internships']
        read_only_fields = ['id']

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        internships_data = validated_data.pop('internships', [])
        profile = Profile.objects.create(**validated_data)

        for skill in skills_data:
            Skill.objects.create(profile=profile, **skill)
        for internship in internships_data:
            Internship.objects.create(profile=profile, **internship)
        return profile

    def update(self, instance, validated_data):
        # Simple fields
        instance.about = validated_data.get('about', instance.about)
        instance.image = validated_data.get('image', instance.image)

        # Skills
        if 'skills' in validated_data:
            skills_data = validated_data.pop('skills', [])
            instance.skills.all().delete()
            for skill in skills_data:
                Skill.objects.create(profile=instance, **skill)

        # Internships
        if 'internships' in validated_data:
            internships_data = validated_data.pop('internships', [])
            instance.internships.all().delete()
            for internship in internships_data:
                Internship.objects.create(profile=instance, **internship)

        instance.save()
        return instance


# ---------------------------
# Coding Platform
# ---------------------------
class CodingPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingPlatform
        fields = ['id', 'leetcode', 'geeksforgeeks', 'codingninjas', 'others']
        read_only_fields = ['id']


# ---------------------------
# Testimonial
# ---------------------------
class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'linkedin_link', 'description', 'image', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


# ---------------------------
# Service / Tool / Value
# ---------------------------
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name']
        read_only_fields = ['id']


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ['id', 'name']
        read_only_fields = ['id']


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = ['id', 'name']
        read_only_fields = ['id']


# ---------------------------
# Project (nested services/tools/values)
# ---------------------------
class ProjectSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True)
    tools = ToolSerializer(many=True)
    values = ValueSerializer(many=True)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'site_view', 'github_link', 'live_link',
            'timeline', 'main_description', 'conclusion',
            'cover_image', 'image1', 'image2',
            'created_at', 'updated_at',
            'services', 'tools', 'values'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        services_data = validated_data.pop('services', [])
        tools_data = validated_data.pop('tools', [])
        values_data = validated_data.pop('values', [])

        project = Project.objects.create(**validated_data)

        for service in services_data:
            Service.objects.create(project=project, **service)
        for tool in tools_data:
            Tool.objects.create(project=project, **tool)
        for value in values_data:
            Value.objects.create(project=project, **value)

        return project

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.site_view = validated_data.get('site_view', instance.site_view)
        instance.github_link = validated_data.get('github_link', instance.github_link)
        instance.live_link = validated_data.get('live_link', instance.live_link)
        instance.timeline = validated_data.get('timeline', instance.timeline)
        instance.main_description = validated_data.get('main_description', instance.main_description)
        instance.conclusion = validated_data.get('conclusion', instance.conclusion)
        instance.cover_image = validated_data.get('cover_image', instance.cover_image)
        instance.image1 = validated_data.get('image1', instance.image1)
        instance.image2 = validated_data.get('image2', instance.image2)

        if 'services' in validated_data:
            services_data = validated_data.pop('services', [])
            instance.services.all().delete()
            for service in services_data:
                Service.objects.create(project=instance, **service)

        if 'tools' in validated_data:
            tools_data = validated_data.pop('tools', [])
            instance.tools.all().delete()
            for tool in tools_data:
                Tool.objects.create(project=instance, **tool)

        if 'values' in validated_data:
            values_data = validated_data.pop('values', [])
            instance.values.all().delete()
            for value in values_data:
                Value.objects.create(project=instance, **value)

        instance.save()
        return instance


# ---------------------------
# Contact
# ---------------------------
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message', 'subject', 'created_at']
        read_only_fields = ['id', 'created_at']
