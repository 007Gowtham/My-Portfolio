from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from .models import User, Experience, ClientFriendReview, Project, ProjectImage
from .models import Contact 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT serializer to include user data in token response"""
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add user data to the response
        data.update({
            'user': {
                'id': self.user.id,
                'name': self.user.name,
                'username': self.user.username,
                'email': self.user.email,
            }
        })
        
        return data

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class ClientFriendReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientFriendReview
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = '__all__'
        read_only_fields = ['project', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    tools_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def get_tools_list(self, obj):
        return [tool.strip() for tool in obj.tools.split(',') if tool.strip()]

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False)
    experiences = ExperienceSerializer(many=True, read_only=True)
    reviews = ClientFriendReviewSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    skills_list = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'name', 'username', 'email', 'password', 'confirm_password',
            'about_me', 'skills', 'skills_list',
            'leetcode_sum', 'leetcode_solved',
            'geeks_for_geeks_sum', 'geeks_for_geeks_solved',
            'coding_ninja_sum', 'coding_ninja_solved',
            'hero_section_image', 'profile_image',
            'experiences', 'reviews', 'projects',
            'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def get_skills_list(self, obj):
        return [skill.strip() for skill in obj.skills.split(',') if skill.strip()]

    def validate(self, attrs):
        # Only validate password confirmation if confirm_password is provided
        if 'confirm_password' in attrs:
            if attrs.get('password') != attrs.get('confirm_password'):
                raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data.pop('confirm_password', None)
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class UserBasicSerializer(serializers.ModelSerializer):
    """Basic user info without nested data and password"""
    skills_list = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'name', 'username', 'email', 'about_me', 'skills', 'skills_list',
            'leetcode_sum', 'leetcode_solved',
            'geeks_for_geeks_sum', 'geeks_for_geeks_solved',
            'coding_ninja_sum', 'coding_ninja_solved',
            'hero_section_image', 'profile_image',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_skills_list(self, obj):
        return [skill.strip() for skill in obj.skills.split(',') if skill.strip()]
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['full_name', 'email', 'subject', 'message']
        
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value
    
    def validate_full_name(self, value):
        """Validate name"""
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("Please provide a valid name.")
        return value.strip()
    
    def validate_message(self, value):
        """Validate message"""
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()