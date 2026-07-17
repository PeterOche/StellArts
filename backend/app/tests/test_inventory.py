from app.services.inventory import InventoryService


def test_mock_hardware_store_find_route():
    service = InventoryService()
    # Dummy coords
    stores = service.store_api.find_stores_near_route(
        40.7000, -74.0100, 40.7600, -73.9700
    )
    assert isinstance(stores, list)
    assert len(stores) >= 1


def test_mock_hardware_store_check_inventory():
    service = InventoryService()
    # Always returns True or False
    res = service.store_api.check_inventory("store_101", ["copper pipe"])
    assert isinstance(res, bool)
