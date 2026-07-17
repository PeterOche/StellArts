import random
import logging
from typing import List, Dict

logger = logging.getLogger(__name__)

class MockHardwareStoreAPI:
    """Mock API for hardware store inventory checks."""
    
    def __init__(self):
        # Mock database of stores with their locations
        self.stores = [
            {"id": "store_101", "name": "Home Depot - Downtown", "lat": 40.7128, "lon": -74.0060},
            {"id": "store_402", "name": "Lowe's - Westside", "lat": 40.7300, "lon": -74.0200},
            {"id": "store_705", "name": "Ace Hardware - East", "lat": 40.7500, "lon": -73.9800},
        ]
        
    def find_stores_near_route(self, start_lat: float, start_lon: float, end_lat: float, end_lon: float, max_deviation_miles: float = 2.0) -> List[Dict]:
        """
        Finds stores that are within the specified deviation of the geodesic route.
        For MVP, we use a simple bounding box approach with some dummy logic.
        """
      
        
        # Select a random sample of stores to simulate geographical filtering
        num_stores = random.randint(1, len(self.stores))
        return random.sample(self.stores, num_stores)

    def check_inventory(self, store_id: str, required_materials: List[str]) -> bool:
        """
        Checks if the required materials are in stock at the store.
        Returns True if all items are in stock, False otherwise.
        """
        # For mock, 70% chance they have the items
        return random.random() < 0.7


class InventoryService:
    def __init__(self):
        self.store_api = MockHardwareStoreAPI()

    async def check_route_inventory(self, artisan, booking, required_materials: List[str]):
        """
        Calculates the route, queries local stores, and triggers a push notification if found.
        """
        if not required_materials:
            return

        # Assuming artisan has lat/lon. If not, fallback to a dummy location.
        start_lat = float(artisan.latitude) if artisan.latitude else 40.7000
        start_lon = float(artisan.longitude) if artisan.longitude else -74.0100
        
       
        end_lat = 40.7600
        end_lon = -73.9700

        # Query local hardware store APIs
        stores_on_route = self.store_api.find_stores_near_route(
            start_lat, start_lon, end_lat, end_lon, max_deviation_miles=2.0
        )

        for store in stores_on_route:
            # Cross-reference store stock with required_materials
            has_stock = self.store_api.check_inventory(store["id"], required_materials)
            
            if has_stock:
                # Dispatch real-time push notification
                from app.services import notification_service
                
                materials_str = ", ".join(required_materials)
                message = f"I found the required {materials_str} on your route at {store['name']}. Click to pre-pay or reserve."
                
                logger.info(f"Inventory check positive: Dispatching push notification to artisan {artisan.id}")
                notification_service.dispatch_push_notification(artisan.id, message)
                break  # Stop checking once we find one store that has everything


inventory_service = InventoryService()
