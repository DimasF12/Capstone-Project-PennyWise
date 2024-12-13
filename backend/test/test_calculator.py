import pytest
from app.service.calculator import calculate_future_value

def test_calculate_future_value():
    result = calculate_future_value(1000, 500, 10, 5)
    assert result > 0
