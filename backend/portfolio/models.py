from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(default=0)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='skills')

    def __str__(self):
        return self.name
    

class Internship(models.Model):  # also fixed spelling
    about = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    year = models.IntegerField()
    role = models.CharField(max_length=100)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='internships')

    def __str__(self):
        return f"{self.role} at {self.company}"
    
class Profile(models.Model):
    about = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='profile_images/', blank=True, null=True)  # Added image field

    def __str__(self):
        return f"Profile {self.id}"
  
class CodingPlatform(models.Model):
    leetcode = models.IntegerField(default=0)
    geeksforgeeks = models.IntegerField(default=0)
    codingninjas = models.IntegerField(default=0)
    others = models.IntegerField(default=0)
    
    def __str__(self):
        return f"CodingPlatform {self.id}"  # Fixed: model doesn't have 'name' field
    
    class Meta:
        verbose_name = "Coding Platform"
        verbose_name_plural = "Coding Platforms"

from django.db import models

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    linkedin_link = models.URLField(max_length=200)  # Changed from LinkedInLink
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Optional: track when testimonial was added
    updated_at = models.DateTimeField(auto_now=True) 
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)  # Optional: image field for testimonial
     # Optional: track when testimonial was updated
    
    def __str__(self):
        return f"Testimonial by {self.name}"
    
    class Meta:
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"
        ordering = ['-created_at']  # Show newest testimonials first


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    site_view = models.BooleanField(default=False)
    github_link = models.URLField(max_length=200, blank=True, null=True)
    live_link = models.URLField(max_length=200, blank=True, null=True)
    timeline = models.CharField(max_length=100, blank=True, null=True)
    main_description = models.TextField(blank=True, null=True)
    conclusion = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Added timestamp
    updated_at = models.DateTimeField(auto_now=True)
    cover_image = models.ImageField(upload_to='project_images/', blank=True, null=True)  
    image1 = models.ImageField(upload_to='project_images/', blank=True, null=True)  # Optional: additional images
    image2 = models.ImageField(upload_to='project_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['-created_at']


class Service(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='services')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"  # Added plural form
        unique_together = ['name', 'project']  # Prevent duplicate services per project


class Tool(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tools')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Tool"
        verbose_name_plural = "Tools"
        unique_together = ['name', 'project']  # Prevent duplicate tools per project


class Value(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='values')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Value"
        verbose_name_plural = "Values"
        unique_together = ['name', 'project']  # Prevent duplicate values per project
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    message = models.TextField()
    subject = models.CharField(max_length=200, blank=True, null=True)  # Optional subject field
    created_at = models.DateTimeField(auto_now_add=True)  # Optional: track when contact was made
    
    def __str__(self):
        return f"Contact from {self.name} ({self.email})"
    
    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"
        ordering = ['-created_at']  # Show newest contacts first