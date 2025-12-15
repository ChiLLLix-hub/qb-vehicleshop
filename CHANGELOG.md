# Changelog - Modern NUI Update

## Version 3.1.0 - Preview Mode with Camera & Color Picker

### 🎨 New Features

#### Preview Mode System
- **Player Invisibility**: Players become invisible to themselves and others when browsing vehicles
- **Preview Camera**: Smooth camera transitions to configurable positions per shop
- **Client-Side Previews**: Vehicle swaps only visible to the interacting player
- **Original Showroom Preservation**: Other players see original showroom vehicles

#### Vehicle Customization
- **360° Rotation**: Interactive slider for rotating preview vehicles
- **Color Picker**: Real-time color preview with 12 popular color options
- **Color Application**: Selected colors applied to purchased vehicles
- **Clean Vehicles**: All spawned vehicles (test drive, purchase) automatically cleaned from dirt

#### Configuration Options
- **Config.EnablePreviewCamera**: Toggle camera system on/off
- **Config.PreviewCameraRotation**: Toggle rotation slider on/off
- **Config.PreviewModeForManagedShops**: Enable/disable preview mode for managed shops (cardealer jobs)
- **PreviewCameraPos**: Configurable camera position per shop (vector4)

#### Managed Shop Support
- **Configurable Preview Mode**: Option to disable isolation features for managed shops
- **Traditional Dealer Workflow**: Dealers stay visible and can demonstrate vehicles to customers
- **Networked Vehicle Swaps**: When preview mode is disabled for managed shops, all players see vehicle swaps
- **Rotation & Color Still Work**: Interactive features available without isolation
- **Flexible Configuration**: Choose between immersive mode (free-use) and collaborative mode (managed)

### 🔧 Technical Implementation

#### New Components
- `VehicleControls.jsx`: Rotation slider and color picker UI
- Preview mode functions in client.lua
- NUI callbacks for rotation and color

#### Files Modified
- `config.lua`: Added camera configuration for all shops
- `client.lua`: Preview mode implementation with camera and vehicle management
- `client_nui.lua`: Integration with preview mode
- `server.lua`: Client-only vehicle swap handling
- `html/src/App.jsx`: Added VehicleControls component

#### New Documentation
- `PREVIEW_MODE_DOCUMENTATION.md`: Complete feature documentation
- `TESTING_GUIDE.md`: Comprehensive testing procedures

### 🎯 Key Improvements
- Better multiplayer experience (no interference between players)
- Professional presentation with clean vehicles
- Enhanced user engagement with interactive controls
- Reduced server load (client-side previews)
- Smooth camera transitions (500ms)

### 📝 Configuration Examples

```lua
-- Global settings
Config.EnablePreviewCamera = true
Config.PreviewCameraRotation = true
Config.PreviewModeForManagedShops = false  -- Recommended: disable for cardealer shops

-- Per-shop camera position
['pdm'] = {
    -- ... other config
    ['PreviewCameraPos'] = vector4(-48.31, -1095.76, 26.7, 320.16),
}
```

### ⚙️ Performance Notes
- Preview vehicles are not networked, reducing server load
- Camera transitions are optimized
- Proper cleanup prevents memory leaks
- Original showroom vehicles preserved and restored

---

## Version 3.0.0 - Modern React NUI

### 🎨 New Features

#### Modern UI System
- **React 18.2 + Vite 5.0**: Complete rewrite of the UI using modern web technologies
- **Tailwind CSS 3.3**: Utility-first CSS framework for responsive design
- **Framer Motion 10.16**: Smooth, buttery animations throughout
- **Glassmorphism Design**: Beautiful, modern glass-effect UI elements

#### Interactive Components
- **VehicleCard**: Display vehicle with test drive, buy, finance, and swap options
- **CategoryGrid**: Icon-based category/make selection with staggered animations
- **VehicleGrid**: Responsive vehicle browsing with pricing and details
- **FinanceModal**: Interactive calculator with real-time payment calculations
- **TestDriveOverlay**: Clean, persistent timer during test drives

#### User Experience
- **Responsive Layout**: Works perfectly on any screen size
- **ESC Key Support**: Quick UI dismissal with escape key
- **Smooth Animations**: All transitions are smooth and performant
- **Intuitive Navigation**: Easy to use with clear visual feedback

### 🔧 Technical Changes

#### Files Added
- `html/` - Complete React application directory
  - `src/components/` - React UI components
  - `src/hooks/` - Custom React hooks
  - `src/utils/` - Helper functions
  - `dist/` - Production build
- `client_nui.lua` - NUI communication layer
- `INSTALLATION.md` - Installation guide
- `NUI_DOCUMENTATION.md` - Technical documentation

#### Files Modified
- `client.lua` - Integrated NUI system, replaced qb-menu calls for main menus
- `fxmanifest.lua` - Added NUI files and ui_page directive
- `README.md` - Updated with new features and dependencies

#### Code Quality
- Added named constants for control keys
- Removed magic numbers
- Improved type checking
- Better code organization
- Comprehensive documentation

### 🔒 Security
- ✅ CodeQL scan: 0 vulnerabilities
- ✅ No security issues detected
- ✅ Safe NUI callbacks
- ✅ Proper input validation

### ⚡ Performance
- Optimized production build (minified & compressed)
- Efficient React rendering
- Lazy loading support
- No performance impact on gameplay

### 📚 Documentation
- Complete installation guide
- Technical documentation with examples
- Developer guide for customization
- Updated main README

### 🔄 Backward Compatibility
- ✅ All existing functionality preserved
- ✅ Database structure unchanged
- ✅ Configuration file compatible
- ✅ Server events unchanged
- ✅ Finance zone still uses qb-menu (for now)
- ✅ Owned vehicles menu still uses qb-menu (for now)

### 📦 Dependencies
No new runtime dependencies! Still requires:
- qb-core
- qb-menu (for finance zone)
- qb-input (for some dialogs)
- PolyZone
- oxmysql

Development dependencies (for building UI):
- Node.js 16+ (for development only)
- npm (for development only)

### 🎯 Migration Path

#### Automatic
1. Pull latest changes
2. Restart resource: `ensure qb-vehicleshop`
3. Done!

#### Manual (if needed)
1. Pull changes
2. If modifying UI: `cd html && npm install && npm run build`
3. Restart resource

### 🐛 Bug Fixes
- Improved reliability of make/category selection
- Better error handling in NUI callbacks
- Fixed potential race conditions in vehicle swapping

### ⚠️ Breaking Changes
**None!** This is a UI update only. All backend functionality remains the same.

### 🔮 Future Possibilities
- Complete migration of finance zone to React
- Owned vehicles management in React
- Vehicle customization preview
- 3D vehicle viewer
- Color picker
- Comparison tool
- Mobile app integration

### 👏 Credits
- **Original qb-vehicleshop**: Kakarot
- **Modern NUI Implementation**: GitHub Copilot
- **Framework**: QBCore Framework
- **Technologies**: React, Vite, Tailwind CSS, Framer Motion

---

## Previous Versions

### Version 2.1.0
- Original qb-menu implementation
- Basic vehicle shop functionality
- Test drives and financing
- Multi-shop support

---

**For support, see [INSTALLATION.md](INSTALLATION.md) and [NUI_DOCUMENTATION.md](NUI_DOCUMENTATION.md)**
