# Standard Django model imports
from django.db import models
from django.contrib import admin
from django.core.validators import MaxValueValidator, MinValueValidator

# Car Make Model
class CarMake(models.Model):
    name = models.CharField(
        max_length=100, 
        help_text="Enter the car make (e.g., Toyota, Ford)"
    )
    description = models.TextField(
        help_text="Enter the description of the car make"
    )

    def __str__(self):
        return self.name

# Car Model
class CarModel(models.Model):
    car_make = models.ForeignKey(
        CarMake, on_delete=models.CASCADE, related_name='car_models'
    )
    name = models.CharField(
        max_length=100, 
        help_text="Enter the car model (e.g., Camry, Mustang)"
    )
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
    ]
    type = models.CharField(
        max_length=10, choices=CAR_TYPES, default='SEDAN',
        help_text="Select the car type"
    )
    year = models.IntegerField(
        default=2023, 
        validators=[MaxValueValidator(2023), MinValueValidator(2015)],
        help_text="Enter the model year between 2015 and 2023"
    )

    def __str__(self):
        return f"{self.car_make.name} {self.name}"

# Register models with admin
admin.site.register(CarMake)
admin.site.register(CarModel)
