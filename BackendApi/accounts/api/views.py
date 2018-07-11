from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from ..models import Profile, Education, Experience
from .serializers import ProfileSerializer, UserSerializer, EducationSerializer, ExperienceSerializer, UserRegistrationSerializer


# Creating a view for the api endpoint


class ProfileView(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedOrReadOnly, )
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer

class EducationView(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedOrReadOnly, )
	queryset = Education.objects.all()
	serializer_class = EducationSerializer

class ExperienceView(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedOrReadOnly, )
	queryset = Experience.objects.all()
	serializer_class = ExperienceSerializer

class UserViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedOrReadOnly, )
	queryset = User.objects.all()
	serializer_class = UserSerializer

class UserRegistrationViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class =UserRegistrationSerializer
