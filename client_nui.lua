-- NUI Control Functions
local nuiOpen = false

-- Open NUI with vehicle data
function OpenVehicleNUI(vehicleData)
    if nuiOpen then return end
    nuiOpen = true
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
            maximumPayments = Config.MaximumPayments
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
function OpenVehicleListNUI(vehicles)
    if nuiOpen then return end
    nuiOpen = true
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
    SetNuiFocus(false, false)
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
    CloseNUI()
    TriggerEvent('qb-vehicleshop:client:TestDrive')
    cb('ok')
end)

RegisterNUICallback('buyVehicle', function(data, cb)
    CloseNUI()
    if data.vehicle then
        TriggerServerEvent('qb-vehicleshop:server:buyShowroomVehicle', {
            buyVehicle = data.vehicle.model
        })
    end
    cb('ok')
end)

RegisterNUICallback('financeVehicle', function(data, cb)
    CloseNUI()
    if data.vehicle then
        local financeData = {
            vehicle = data.vehicle.model,
            price = data.vehicle.price,
            downPayment = data.downPayment,
            paymentAmount = data.paymentAmount
        }
        TriggerServerEvent('qb-vehicleshop:server:financeVehicle', financeData)
    end
    cb('ok')
end)

RegisterNUICallback('swapVehicle', function(data, cb)
    CloseNUI()
    if Config.FilterByMake then
        TriggerEvent('qb-vehicleshop:client:vehMakes')
    else
        TriggerEvent('qb-vehicleshop:client:vehCategories')
    end
    cb('ok')
end)

RegisterNUICallback('selectCategory', function(data, cb)
    CloseNUI()
    if data.category then
        TriggerEvent('qb-vehicleshop:client:showVehicleList', data.category)
    end
    cb('ok')
end)

RegisterNUICallback('selectVehicle', function(data, cb)
    CloseNUI()
    if data.vehicle then
        TriggerEvent('qb-vehicleshop:client:swapVehicle', data.vehicle)
    end
    cb('ok')
end)

RegisterNUICallback('returnTestDrive', function(data, cb)
    TriggerEvent('qb-vehicleshop:client:TestDriveReturn')
    cb('ok')
end)
