# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    """Main user/owner of the portfolio"""
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    about_me = models.TextField()
    skills = models.TextField(help_text="Comma-separated skills")
    
    # Coding Platform Stats
    leetcode_sum = models.IntegerField(default=0)
    leetcode_solved = models.IntegerField(default=0)
    geeks_for_geeks_sum = models.IntegerField(default=0)
    geeks_for_geeks_solved = models.IntegerField(default=0)
    coding_ninja_sum = models.IntegerField(default=0)
    coding_ninja_solved = models.IntegerField(default=0)
    
    # Images
    hero_section_image = CloudinaryField('image', null=True, blank=True)
    profile_image = CloudinaryField('image', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'portfolio_user'

class Experience(models.Model):
    """Work experience and internships"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiences')
    company_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    work_type = models.CharField(max_length=50, choices=[
        ('internship', 'Internship'),
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('freelance', 'Freelance')
    ])
    start_year = models.IntegerField()
    end_year = models.IntegerField(null=True, blank=True, help_text="Leave blank if current")
    description = models.TextField()
    is_current = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.role} at {self.company_name}"

    class Meta:
        db_table = 'portfolio_experience'
        ordering = ['-start_year']

class ClientFriendReview(models.Model):
    """Reviews from clients and friends"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    reviewer_email = models.EmailField()
    review_text = models.TextField()
    about_reviewer = models.TextField(help_text="Brief about the reviewer")
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    reviewer_image = CloudinaryField('image', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.reviewer_name}"

    class Meta:
        db_table = 'portfolio_reviews'
        ordering = ['-created_at']

class Project(models.Model):
    """Portfolio projects"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    project_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    tools = models.TextField(help_text="Comma-separated tools/technologies used")
    service = models.CharField(max_length=100, help_text="Type of service/category")
    timeline = models.CharField(max_length=50, help_text="e.g., '2 months', 'Jan 2024 - Mar 2024'")
    about = models.TextField(help_text="Brief about the project")
    main_description = models.TextField()
    second_description = models.TextField()
    conclusion = models.TextField()
    
    # Project Links
    live_demo_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    
    # Status
    is_featured = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned')
    ], default='completed')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.project_name

    class Meta:
        db_table = 'portfolio_projects'
        ordering = ['-created_at']

class ProjectImage(models.Model):
    """Images for each project (4 images: hero + 3 others)"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = CloudinaryField('image')
    image_type = models.CharField(max_length=20, choices=[
        ('hero', 'Hero Image'),
        ('gallery', 'Gallery Image')
    ])
    caption = models.CharField(max_length=200, null=True, blank=True)
    order = models.IntegerField(default=1, help_text="Display order")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project.project_name} - {self.image_type}"

    class Meta:
        db_table = 'portfolio_project_images'
        ordering = ['order']
