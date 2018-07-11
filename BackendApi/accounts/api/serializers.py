from django.contrib.auth.models import User
from rest_framework import serializers
from Skills.api.serializers import SkillsSerializer
from ..models import Profile, Education, Experience


class ProfileSerializer(serializers.ModelSerializer):

	class Meta:
		model = Profile
		fields = ("firstName", "lastName", "avatar", "location", "website", "company", "title",
                  "backgroundImage", "bio", "twitter", "facebook", "linkedin", "instagram", "youtube", "github", "donator")

class EducationSerializer(serializers.ModelSerializer):

	class Meta:
		model = Education
		fields = ("id","school", "qualification", "fieldOfStudy", "dateFrom", "dateTo", "description")

class ExperienceSerializer(serializers.ModelSerializer):

	class Meta:
		model = Experience
		fields = ("id", "jobTitle", "company", "location", "dateFrom", "dateTo", "description", "current")

class UserSerializer(serializers.ModelSerializer):
	profile = ProfileSerializer()
	education = EducationSerializer()
	experience = ExperienceSerializer()
	#skills = SkillsSerializer(many =True)
	class Meta:
		model = User
		fields = ("id", "username", "email", "password", "profile", "education", "experience")
		write_only_fields = ('password',)
		read_only_fields = ('id',)
		extra_kwargs = {
				"password": {
					"write_only": True,
					"required": True
				}}



	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['username'],
			email=validated_data['email']
		)

		user.set_password(validated_data['password'])
		user.save()

		return user
