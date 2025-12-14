# Testing Guide for Vehicle Shop Preview Mode

## Pre-Testing Setup

### Requirements
- QBCore Framework
- qb-menu
- qb-input
- PolyZone
- LegacyFuel (or compatible fuel system)

### Installation
1. Ensure `qb-vehicleshop` is properly installed
2. Restart the resource: `ensure qb-vehicleshop`
3. Verify the NUI files in `html/dist/` are up to date

## Test Cases

### Test 1: Basic Menu Interaction
**Steps:**
1. Go to Premium Deluxe Motorsport (PDM)
2. Stand near any display vehicle
3. Press E to open the vehicle menu

**Expected Results:**
- ✓ Player becomes invisible
- ✓ Camera moves to configured position (vector4(-48.31, -1095.76, 26.7, 320.16))
- ✓ Vehicle card appears on the left side
- ✓ Rotation slider and color picker appear at bottom center
- ✓ Other players cannot see you

**Test Cleanup:**
- Press ESC to close menu
- Player should become visible again
- Camera should return to normal

---

### Test 2: Vehicle Rotation
**Steps:**
1. Open vehicle menu (Test 1)
2. Move the rotation slider left and right

**Expected Results:**
- ✓ Vehicle rotates smoothly in real-time
- ✓ Rotation value displays in degrees (0-360°)
- ✓ Rotation is preserved when swapping vehicles
- ✓ Other players do not see the rotation

---

### Test 3: Color Selection
**Steps:**
1. Open vehicle menu (Test 1)
2. Click "Show Colors" button
3. Click different color squares

**Expected Results:**
- ✓ Color picker grid appears (12 colors)
- ✓ Vehicle color changes immediately
- ✓ Selected color has highlighted border
- ✓ Color changes are client-side only (other players don't see)

---

### Test 4: Vehicle Swapping
**Steps:**
1. Open vehicle menu (Test 1)
2. Click "Swap Vehicle" button
3. Select a category
4. Select a different vehicle

**Expected Results:**
- ✓ Menu transitions to category selection
- ✓ Category grid displays available categories
- ✓ Vehicle list displays vehicles in selected category
- ✓ Selected vehicle spawns in showroom
- ✓ New vehicle is clean (no dirt)
- ✓ Rotation and color settings are preserved
- ✓ Only you see the swapped vehicle
- ✓ Other players see the original showroom vehicle

---

### Test 5: Test Drive
**Steps:**
1. Open vehicle menu (Test 1)
2. Optionally: select a color
3. Click "Test Drive" button

**Expected Results:**
- ✓ Menu closes
- ✓ Player becomes visible again
- ✓ Camera returns to normal
- ✓ Vehicle spawns at TestDriveSpawn location
- ✓ Vehicle is clean (no dirt)
- ✓ Player is placed in driver seat
- ✓ Test drive timer appears
- ✓ Fuel is set to 100%
- ✓ Vehicle keys are given

---

### Test 6: Purchase Vehicle (Cash)
**Steps:**
1. Ensure player has enough money
2. Open vehicle menu (Test 1)
3. Select a color (optional)
4. Click "Buy Now" button

**Expected Results:**
- ✓ Menu closes
- ✓ Player becomes visible again
- ✓ Camera returns to normal
- ✓ Vehicle spawns at VehicleSpawn location
- ✓ Vehicle is clean (no dirt)
- ✓ Selected color is applied
- ✓ Player is placed in driver seat
- ✓ Fuel is set to 100%
- ✓ Vehicle keys are given
- ✓ Money is deducted
- ✓ Vehicle is added to database

---

### Test 7: Finance Vehicle
**Steps:**
1. Ensure player has enough money for down payment
2. Open vehicle menu (Test 1)
3. Click "Finance" button
4. Enter down payment and payment amounts
5. Submit

**Expected Results:**
- ✓ Finance modal appears
- ✓ Down payment slider works
- ✓ Payment amount slider works
- ✓ Total calculations are correct
- ✓ Vehicle spawns after confirmation
- ✓ Selected color is applied
- ✓ Finance record is created

---

### Test 8: Multi-Player Visibility
**Requirements:** 2 players

**Steps:**
1. Player 1: Open vehicle menu at PDM
2. Player 2: Stand nearby watching
3. Player 1: Rotate vehicle, change colors, swap vehicles
4. Player 1: Exit menu

**Expected Results:**
- ✓ Player 2 cannot see Player 1 when menu is open
- ✓ Player 2 does not see vehicle rotating
- ✓ Player 2 does not see color changes
- ✓ Player 2 does not see vehicle swaps
- ✓ Player 2 can see Player 1 again when menu closes
- ✓ Showroom vehicles remain unchanged for Player 2

---

### Test 9: ESC Key Functionality
**Steps:**
1. Open vehicle menu (Test 1)
2. Press ESC key

**Expected Results:**
- ✓ Menu closes immediately
- ✓ Player becomes visible
- ✓ Camera returns to normal
- ✓ Preview vehicle is cleaned up
- ✓ Original showroom vehicle is restored

---

### Test 10: Camera Positioning (All Shops)
**Steps:**
1. Visit each shop:
   - PDM: -45.67, -1098.34, 26.42
   - Luxury: -1255.6, -361.16, 36.91
   - Boats: -738.25, -1334.38, 1.6
   - Air: -1652.76, -3143.4, 13.99
   - Truck: 900.47, -1155.74, 25.16
2. Open menu at each location

**Expected Results:**
- ✓ Camera moves to appropriate position for each shop
- ✓ Vehicle is properly framed in view
- ✓ Camera heading provides good viewing angle
- ✓ Camera transition is smooth (500ms)

---

### Test 11: Config Toggles
**Steps:**
1. Set `Config.EnablePreviewCamera = false` in config.lua
2. Restart resource
3. Open vehicle menu

**Expected Results:**
- ✓ Camera does not move
- ✓ Player still becomes invisible
- ✓ Other features work normally

**Steps:**
4. Set `Config.PreviewCameraRotation = false`
5. Restart resource
6. Open vehicle menu

**Expected Results:**
- ✓ Rotation slider does not appear
- ✓ Color picker still works
- ✓ Other features work normally

---

### Test 12: Managed Shop (Luxury)
**Requirements:** Player with 'cardealer' job

**Steps:**
1. Go to Luxury Vehicle Shop
2. Open vehicle menu
3. Test all features (rotation, color, swap, etc.)

**Expected Results:**
- ✓ All features work same as free-use shop
- ✓ Camera position is correct for luxury shop
- ✓ Can sell to other players (existing functionality)

---

## Performance Testing

### Resource Usage
**Monitor:**
- Client FPS during preview mode
- Server tick time during vehicle swaps
- Memory usage before/after opening menu
- Network traffic during preview (should be minimal)

**Expected:**
- No significant FPS drops
- No server performance impact
- Memory properly cleaned up on menu close
- Minimal network traffic (preview is client-side)

---

## Edge Cases

### Test 13: Rapid Menu Opening/Closing
**Steps:**
1. Rapidly open and close menu 10 times
2. Check for memory leaks

**Expected Results:**
- ✓ No crashes
- ✓ No orphaned vehicles
- ✓ No orphaned cameras
- ✓ Player visibility state correct

### Test 14: Resource Restart During Preview
**Steps:**
1. Open vehicle menu
2. Execute `/restart qb-vehicleshop` or `restart qb-vehicleshop` in server console
3. Wait for resource to restart

**Expected Results:**
- ✓ Preview mode cleaned up before restart
- ✓ Player visibility restored
- ✓ Camera cleaned up
- ✓ No errors in console
- ✓ Resource restarts successfully
- ✓ Shop works normally after restart

### Test 15: Connection Loss During Preview
**Steps:**
1. Open vehicle menu
2. Simulate connection loss (disconnect ethernet or use `/disconnect`)
3. Reconnect to the server

**Expected Results:**
- ✓ Player reconnects successfully
- ✓ Preview mode is automatically cleaned up on disconnect
- ✓ Player is visible again after reconnect
- ✓ Camera is restored to normal
- ✓ Preview vehicles are cleaned up
- ✓ Can use shop normally after reconnect
- ✓ No broken state or leftover entities

### Test 16: Purchase During Preview
**Steps:**
1. Player A: Opens menu, selects vehicle and color
2. Player B: Purchases same showroom spot vehicle
3. Player A: Tries to purchase

**Expected Results:**
- ✓ Transaction handled gracefully
- ✓ No duplicate purchases
- ✓ Appropriate error messages

---

## Regression Testing

Verify existing functionality still works:
- ✓ Finance zone interactions
- ✓ Finance payment system
- ✓ Vehicle ownership
- ✓ Test drive return zones
- ✓ qb-target integration (if enabled)
- ✓ Job-based shop restrictions

---

## Known Limitations

1. Preview vehicles use SetEntityVisibleToNetwork(false), so they won't be visible to other players
2. Color picker shows 12 popular colors (can be extended)
3. Camera positions are static per shop (not dynamic based on vehicle size)
4. Rotation is around vehicle center (not customizable pivot point)

---

## Debugging

### Enable Debug Mode
In html/src/utils/misc.js, set:
```javascript
const isEnvBrowser = true; // Set to true for browser testing
```

### Console Commands
Check for errors in:
- F8 console (in-game)
- Browser console (for NUI)
- Server console (for backend)

### Common Issues
1. **Vehicle not spawning**: Check model exists in QBCore.Shared.Vehicles
2. **Camera not moving**: Check PreviewCameraPos is valid vector4
3. **Colors not applying**: Check color index is valid (0-159)
4. **Player stuck invisible**: Press ESC or relog to reset state

---

## Success Criteria

All tests pass with:
- ✓ No console errors
- ✓ No performance degradation
- ✓ No memory leaks
- ✓ Smooth user experience
- ✓ Multiplayer compatibility
- ✓ All existing features work
