# Vehicle Shop Preview Mode

This document describes the new preview mode features added to qb-vehicleshop.

## Features

### 1. Player Invisibility
When a player interacts with the vehicle shop menu:
- The player becomes invisible to themselves and other players
- Player collision is disabled for a smooth preview experience
- Invisibility is automatically restored when the menu is closed or a purchase is made

### 2. Preview Camera
- Configurable camera position per shop via `PreviewCameraPos` in config.lua
- Camera smoothly transitions when opening the vehicle menu
- Default positions set for all shops (PDM, Luxury, Boats, Air, Truck)
- Can be disabled by setting `Config.EnablePreviewCamera = false`

### 3. 360° Vehicle Rotation
- Interactive slider at the bottom center of the screen
- Allows full 360° rotation of the preview vehicle
- Rotation is preserved when swapping vehicles
- Can be disabled by setting `Config.PreviewCameraRotation = false`

### 4. Color Picker
- Select primary and secondary colors for the vehicle
- Color preview updates in real-time
- Selected colors are applied to the purchased vehicle
- 12 popular color options available
- Color picker can be toggled show/hide for cleaner UI

### 5. Client-Side Vehicle Preview
- Vehicles swapped during preview are only visible to the interacting player
- Original showroom vehicles remain visible to other players
- No network traffic for vehicle swaps during preview
- Temporary preview vehicles are automatically cleaned up

### 6. Clean Vehicles
- All spawned vehicles (test drive, purchase) are automatically cleaned
- No dirt or damage on delivered vehicles
- Ensures professional presentation

## Configuration

### Global Settings
```lua
Config.EnablePreviewCamera = true      -- Enable/disable camera system
Config.PreviewCameraRotation = true    -- Enable/disable rotation slider
```

### Per-Shop Camera Position
Add to each shop in Config.Shops:
```lua
['PreviewCameraPos'] = vector4(x, y, z, heading)
```

Example for PDM:
```lua
['PreviewCameraPos'] = vector4(-48.31, -1095.76, 26.7, 320.16)
```

## Technical Details

### Client-Side Functions
- `StartPreviewMode()` - Activates preview mode with camera and invisibility
- `StopPreviewMode()` - Restores normal state
- `RotatePreviewVehicle(rotation)` - Rotates the preview vehicle
- `SetPreviewVehicleColor(colorIndex, colorType)` - Applies color to preview
- `CleanVehicle(vehicle)` - Removes dirt from vehicle

### NUI Callbacks
- `rotateVehicle` - Called when rotation slider changes
- `setVehicleColor` - Called when a color is selected

## Usage

1. Player enters vehicle shop zone
2. Presses interaction key (E by default)
3. Preview mode activates:
   - Player becomes invisible
   - Camera moves to configured position
   - Preview vehicle is created (client-side only)
4. Player can:
   - Rotate vehicle with slider
   - Change colors with color picker
   - Swap to different vehicles
   - Test drive or purchase
5. On exit/purchase:
   - Player visibility restored
   - Camera returns to normal
   - Preview vehicle cleaned up
   - Selected colors applied to purchased vehicle

## Compatibility

- Works with both `free-use` and `managed` shop types
- Compatible with qb-target (vehicle interaction still works)
- No changes required to existing vehicle configurations
- Backwards compatible with existing saves

## Performance Notes

- Preview vehicles are not networked, reducing server load
- Camera transitions are smooth (500ms)
- Vehicle model streaming is optimized with proper cleanup
- Original showroom vehicles are preserved and restored
