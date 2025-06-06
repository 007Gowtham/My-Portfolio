# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)
router.register(r'coding', views.CodingViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'tools', views.ToolViewSet)

urlpatterns = [
    path('', include(router.urls)),
]