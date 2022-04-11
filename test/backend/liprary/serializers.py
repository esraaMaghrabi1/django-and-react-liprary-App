from rest_framework import serializers
from liprary.models import BorowerInformation , booksec, Book

class BookSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = booksec
		fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
  	class Meta:
  		model = Book
  		fields = '__all__'

class BorowerInfoSerializer(serializers.ModelSerializer):
  	class Meta:
  		model = BorowerInformation
  		fields = '__all__'

