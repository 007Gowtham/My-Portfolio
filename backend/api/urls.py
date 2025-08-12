from django.urls import path, include
from rest_framework.routers import DefaultRouter
from  portfolio.views import ProfileViewSet,CodingPlatformViewSet,TestimonialViewSet, ProjectViewSet

# Create a router and register our ViewSet
router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'coding-platforms', CodingPlatformViewSet, basename='codingplatform')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'projects', ProjectViewSet, basename='project')


urlpatterns = [
    path('', include(router.urls)),
]