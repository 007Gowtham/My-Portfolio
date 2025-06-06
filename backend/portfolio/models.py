from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Profile(models.Model):
    profile_image = CloudinaryField('profile_image', null=True, blank=True)
    about = models.TextField(max_length=500, null=True, blank=True)

class Skill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='skills')
    skill_name = models.TextField(null=True, blank=True)

class Experience(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experience')
    company_name = models.TextField(null=True, blank=True)
    role = models.TextField(null=True, blank=True)
    year = models.TextField(null=True, blank=True)

class Coding(models.Model):
    leetcode = models.IntegerField(default=0)
    geeksforgeeks = models.IntegerField(default=0)
    codingninja = models.IntegerField(default=0)
    others = models.IntegerField(default=0)

    def __str__(self):
        return f"Coding stats: Leetcode={self.leetcode}, GFG={self.geeksforgeeks}, Ninja={self.codingninja}, Others={self.others}"

class Review(models.Model):
    reviewer_name = models.TextField(max_length=100, null=True, blank=True)
    reviewed_platform = models.TextField(max_length=50, null=True, blank=True)
    review = models.TextField(null=True, blank=True)
    review_platform_image = CloudinaryField('image', null=True, blank=True)

class Project(models.Model):
    project_title = models.CharField(max_length=255, null=True, blank=True)
    project_description = models.TextField(null=True, blank=True)
    service = models.CharField(max_length=255, null=True, blank=True)
    value = models.CharField(max_length=255, null=True, blank=True)
    timeline = models.CharField(max_length=100, null=True, blank=True)
    project_hero_image = CloudinaryField('image', null=True, blank=True)
    project_image_1 = CloudinaryField('image', null=True, blank=True)
    project_image_2 = CloudinaryField('image', null=True, blank=True)
    project_image_3 = CloudinaryField('image', null=True, blank=True)
    project_intro_text = models.TextField(null=True, blank=True)
    project_main_text = models.TextField(null=True, blank=True)
    project_conclusion = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.project_title or "Untitled Project"

class Tool(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tools')
    tool_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.tool_name or "Unnamed Tool"