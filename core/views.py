from django.shortcuts import render
from django.http import JsonResponse
import json

def index(request):
    """Main view that renders our template with React and jQuery."""
    return render(request, 'index.html')

def get_data(request):
    """Example API endpoint that returns JSON data for both React and jQuery."""
    data = {
        'items': [
            {'id': 1, 'name': 'Item 1', 'description': 'Description for Item 1'},
            {'id': 2, 'name': 'Item 2', 'description': 'Description for Item 2'},
            {'id': 3, 'name': 'Item 3', 'description': 'Description for Item 3'},
        ]
    }
    return JsonResponse(data)