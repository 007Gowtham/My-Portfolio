from django.contrib import admin
from .models import User, Experience, ClientFriendReview, Project, ProjectImage

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'username', 'email', 'created_at']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'role', 'work_type', 'start_year', 'end_year']
    list_filter = ['work_type', 'start_year']

@admin.register(ClientFriendReview)
class ClientFriendReviewAdmin(admin.ModelAdmin):
    list_display = ['reviewer_name', 'reviewer_email', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'service', 'status', 'is_featured', 'created_at']
    list_filter = ['status', 'is_featured', 'service']

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'image_type', 'order', 'created_at']
    list_filter = ['image_type']