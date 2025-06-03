from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # ======================== JWT AUTHENTICATION URLS ========================
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', views.logout, name='logout'),
    
    # ======================== USER/PORTFOLIO OWNER URLS ========================
    path('user/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('data/', views.get_portfolio_data, name='portfolio-data'),
    
    # ======================== EXPERIENCE URLS (Class-based views) ========================
    path('experiences/', views.ExperienceListCreateView.as_view(), name='experience-list-create-cbv'),
    path('experiences/<int:pk>/', views.ExperienceDetailView.as_view(), name='experience-detail-cbv'),
    
    # ======================== EXPERIENCE URLS (Function-based views - Alternative) ========================
    path('experiences/fbv/', views.experience_list_create, name='experience-list-create-fbv'),
    path('experiences/fbv/<int:pk>/', views.experience_detail, name='experience-detail-fbv'),
    
    # ======================== REVIEW URLS (Class-based views) ========================
    path('reviews/', views.ReviewListCreateView.as_view(), name='review-list-create-cbv'),
    path('reviews/<int:pk>/', views.ReviewDetailView.as_view(), name='review-detail-cbv'),
    
    # ======================== REVIEW URLS (Function-based views - Alternative) ========================
    path('reviews/fbv/', views.review_list_create, name='review-list-create-fbv'),
    path('reviews/fbv/<int:pk>/', views.review_detail, name='review-detail-fbv'),
    
    # ======================== PROJECT URLS (Class-based views) ========================
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create-cbv'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail-cbv'),
    
    # ======================== PROJECT URLS (Function-based views - Alternative) ========================
    path('projects/fbv/', views.project_list_create, name='project-list-create-fbv'),
    path('projects/fbv/<int:pk>/', views.project_detail, name='project-detail-fbv'),
    
    # ======================== PROJECT IMAGE URLS (Class-based views) ========================
    path('projects/<int:project_id>/images/', 
         views.ProjectImageListCreateView.as_view(), 
         name='project-image-list-create-cbv'),
    path('projects/<int:project_id>/images/<int:image_id>/', 
         views.ProjectImageDetailView.as_view(), 
         name='project-image-detail-cbv'),
    
    # ======================== PROJECT IMAGE URLS (Function-based views - Alternative) ========================
    path('projects/fbv/<int:project_id>/images/', 
         views.project_image_list_create, 
         name='project-image-list-create-fbv'),
    path('projects/fbv/<int:project_id>/images/<int:image_id>/', 
         views.project_image_detail, 
         name='project-image-detail-fbv'),
    
     path('api/contact/', views.contact_submit, name='contact_submit'),
    path('api/contacts/', views.contact_list, name='contact_list'),
      
]