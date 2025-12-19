-- NUI Control Functions
local nuiOpen = false
local currentCategoryContext = {}  -- Track category/make context for vehicle selection

-- Open NUI with vehicle data
function OpenVehicleNUI(vehicleData)
    if nuiOpen then return end
    nuiOpen = true
    StartPreviewMode()  -- Start preview mode with camera and invisibility
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        visible = true
    })
    SendNUIMessage({
        action = 'openVehicleMenu',
        vehicle = vehicleData,
        config = {
            minimumDown = Config.MinimumDown,
            maximumPayments = Config.MaximumPayments,
            enableRotation = Config.PreviewCameraRotation or false
        }
    })
end

-- Open category selection
function OpenCategoryNUI(categories)
    if nuiOpen then return end
    nuiOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        visible = true
    })
    SendNUIMessage({
        action = 'openCategoryMenu',
        categories = categories
    })
end

-- Open vehicle list
function OpenVehicleListNUI(vehicles, categoryContext)
    if nuiOpen then return end
    nuiOpen = true
    -- Store category context for vehicle selection
    if categoryContext then
        currentCategoryContext = categoryContext
    end
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        visible = true
    })
    SendNUIMessage({
        action = 'openVehicleList',
        vehicles = vehicles
    })
end

-- Refresh vehicle list (even if NUI is already open)
function RefreshVehicleListNUI(vehicles, categoryContext)
    nuiOpen = true
    -- Store category context for vehicle selection
    if categoryContext then
        currentCategoryContext = categoryContext
    end
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        visible = true
    })
    SendNUIMessage({
        action = 'openVehicleList',
        vehicles = vehicles
    })
end

-- Open finance menu
function OpenFinanceNUI(vehicleData)
    if nuiOpen then return end
    nuiOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        visible = true
    })
    SendNUIMessage({
        action = 'openFinanceMenu',
        vehicle = vehicleData,
        config = {
            minimumDown = Config.MinimumDown,
            maximumPayments = Config.MaximumPayments
        }
    })
end

-- Start test drive overlay
function StartTestDriveNUI()
    SendNUIMessage({
        action = 'startTestDrive'
    })
end

-- Update test drive time
function UpdateTestDriveTime(timeStr)
    SendNUIMessage({
        action = 'updateTestDriveTime',
        time = timeStr
    })
end

-- End test drive
function EndTestDriveNUI()
    SendNUIMessage({
        action = 'endTestDrive'
    })
end

-- Close NUI
function CloseNUI()
    if not nuiOpen then return end
    nuiOpen = false
    
    -- Don't reset showroom vehicle - keep last swapped vehicle
    -- Removed: ResetShowroomVehicle(insideShop, ClosestVehicle)
    
    StopPreviewMode()  -- Stop preview mode and restore player visibility
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'setVisible',
        visible = false
    })
end

-- Close NUI without resetting vehicle (for test drive/buy operations)
function CloseNUIWithoutReset()
    if not nuiOpen then return end
    nuiOpen = false
    
    -- Don't reset vehicle - preserve choice for test drive/buy
    StopPreviewMode()  -- Stop preview mode and restore player visibility
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'setVisible',
        visible = false
    })
end

-- Transition menu without stopping preview mode (for swap workflow)
function TransitionMenu()
    nuiOpen = false
    SendNUIMessage({
        action = 'setVisible',
        visible = false
    })
end

-- NUI Callbacks
RegisterNUICallback('closeUI', function(data, cb)
    CloseNUI()
    cb('ok')
end)

RegisterNUICallback('testDrive', function(data, cb)
    -- Close NUI without resetting vehicle to preserve choice for test drive
    CloseNUIWithoutReset()
    TriggerEvent('qb-vehicleshop:client:TestDrive')
    cb('ok')
end)

RegisterNUICallback('buyVehicle', function(data, cb)
    if data.vehicle then
        -- Trigger buy event directly (confirmation already shown in NUI)
        TriggerEvent('qb-vehicleshop:client:confirmBuy', {
            model = data.vehicle.model
        })
    end
    cb('ok')
end)

RegisterNUICallback('financeVehicle', function(data, cb)
    if data.vehicle then
        -- Trigger finance event directly (confirmation already shown in NUI)
        TriggerEvent('qb-vehicleshop:client:confirmFinance', {
            model = data.vehicle.model,
            price = data.vehicle.price,
            downPayment = data.downPayment,
            paymentAmount = data.paymentAmount
        })
    end
    cb('ok')
end)

RegisterNUICallback('swapVehicle', function(data, cb)
    -- Don't close NUI or stop preview mode - just transition to category menu
    TransitionMenu()
    if Config.FilterByMake then
        TriggerEvent('qb-vehicleshop:client:vehMakes')
    else
        TriggerEvent('qb-vehicleshop:client:vehCategories')
    end
    cb('ok')
end)

RegisterNUICallback('selectCategory', function(data, cb)
    -- Don't close NUI or stop preview mode - just transition to vehicle list
    TransitionMenu()
    if data.category then
        -- Check if it's a make or category based on type
        -- Makes will have a 'type' property set to 'make'
        if data.category.type == 'make' then
            -- This is a make/brand
            TriggerEvent('qb-vehicleshop:client:vehCategories', { make = data.category.id })
        else
            -- This is a category
            TriggerEvent('qb-vehicleshop:client:openVehCats', { catName = data.category.id })
        end
    end
    cb('ok')
end)

RegisterNUICallback('selectVehicle', function(data, cb)
    -- Don't close NUI - keep menu open for swapping
    if data.vehicle then
        TriggerServerEvent('qb-vehicleshop:server:swapVehicle', {
            toVehicle = data.vehicle.model,
            ClosestVehicle = ClosestVehicle,
            ClosestShop = insideShop,
            catName = currentCategoryContext.catName,
            make = currentCategoryContext.make,
            onecat = currentCategoryContext.onecat
        })
    end
    cb('ok')
end)

RegisterNUICallback('returnTestDrive', function(data, cb)
    TriggerEvent('qb-vehicleshop:client:TestDriveReturn')
    cb('ok')
end)

-- Rotation and color sliders callbacks kept as no-ops to prevent NUI errors
-- Actual functionality removed per user request
RegisterNUICallback('rotateVehicle', function(data, cb)
    -- No-op: rotation slider removed per user request
    cb('ok')
end)

RegisterNUICallback('setVehicleColor', function(data, cb)
    if data.colorIndex and data.colorType then
        SetPreviewVehicleColor(data.colorIndex, data.colorType)
    end
    cb('ok')
end)
