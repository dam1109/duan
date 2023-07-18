var paymentDetails = {
    amount: 100.00,
    orderId: '12345',
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    customerPhone: '123456789'
};

var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: JSON.stringify(paymentDetails),
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});
$(document).ready(function () {
    $("input[name='payment_method']").click(function () {
        if ($(this).val() == 'cod') {
            $("#bank_transfer").hide();
            $("#cod_div").show();
        } else {
            $("#cod_div").hide();
            $("#bank_transfer").show();
        }
    });
});
var paymentMethod = document.getElementById("payment-method");
var bankTransferInfo = document.getElementById("bank-transfer-info");

paymentMethod.addEventListener("change", function () {
    if (paymentMethod.value === "bank-transfer") {
        bankTransferInfo.style.display = "block";
    } else {
        bankTransferInfo.style.display = "none";
    }
});
// var provinceSelect = document.getElementById("province");
// var districtSelect = document.getElementById("district");
// var wardSelect = document.getElementById("ward");

// var districts = {
//   hanoi: ['Cầu Giấy', 'Thanh Xuân', 'Đống Đa', 'Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Long Biên'],
//   hochiminh: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7'],
//   danang: ['Hải Châu', 'Thanh Khê', 'Cẩm Lệ', 'Liên Chiểu']
// };

// var wards = {
//   hanoi_Caugiay: ['Dịch Vọng Hậu', 'Nghĩa Đô', 'Quan Hoa', 'Yên Hòa'],
//   hanoi_Thanhxuan: ['Khương Đình', 'Hạ Đình', 'Nhân Chính', 'P. Nhân Thọ'],
// };

// provinceSelect.addEventListener("change", function() {
//   var provinceValue = provinceSelect.value;

//   if (provinceValue) {
//     districtSelect.innerHTML = "<option value=''>-- Chọn quận/huyện --</option>";
//     for (var i = 0; i < districts[provinceValue].length; i++) {
//       var district = districts[provinceValue][i];
//       districtSelect.innerHTML += "<option value='" + provinceValue + "_" + district + "'>" + district + "</option>";
//     }
//   } else {
//     districtSelect.innerHTML = "<option value='districts'>-- Chọn quận/huyện --</option>";
//   }

//   wardSelect.innerHTML = "<option value='wards'>-- Chọn xã/phường --</option>";
// });

// districtSelect.addEventListener("change", function() {
//   var districtValue = districtSelect.value;

//   if (districtValue) {
//     var districtInfo = districtValue.split("_");
//     var districtId = districtInfo[0];
//     var districtName = districtInfo[1];

//     wardSelect.innerHTML = "<option value=''>-- Chọn xã/phường --</option>";
//     for (var i = 0; i < wards[districtId + "_" + districtName].length; i++) {
//       var ward = wards[districtId + "_" + districtName][i];
//       wardSelect.innerHTML += "<option value='" + ward + "'>" + ward + "</option>";
//     }
//   } else {
//     wardSelect.innerHTML = "<option value=''>-- Chọn xã/phường --</option>";
//   }
// });




var xhr = new XMLHttpRequest();
xhr.open("GET", "tinh_huyen_xa.json");
xhr.onload = function() {
  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    initSelect(data);
  }
};
xhr.send();

// Initialize province, district and commune select box
function initSelect(data) {
  var provinceSelect = document.getElementById("province-select");
  var districtSelect = document.getElementById("district-select");
  var communeSelect = document.getElementById("commune-select");
  
  // Populate province options
  data.forEach(function(province) {
    var option = document.createElement("option");
    option.text = province.name;
    option.value = province.code;
    provinceSelect.add(option);
  });

  // Update district options on province change
  var currentProvince = data[0];
  provinceSelect.addEventListener("change", function() {
    currentProvince = data.find(function(province) {
      return province.code === this.value;
    }, this);

    // Clear district and commune options
    districtSelect.innerHTML = "";
    communeSelect.innerHTML = "";

    // Populate district options
    currentProvince.districts.forEach(function(district) {
      var option = document.createElement("option");
      option.text = district.name;
      option.value = district.code;
      districtSelect.add(option);
    });

    // Trigger district change event
    var event = new Event("change");
    districtSelect.dispatchEvent(event);
  });

  // Update commune options on district change
  districtSelect.addEventListener("change", function() {
    var currentDistrict = currentProvince.districts.find(function(district) {
      return district.code === this.value;
    }, this);

    // Clear commune options
    communeSelect.innerHTML = "";

    // Populate commune options
    currentDistrict.communes.forEach(function(commune) {
      var option = document.createElement("option");
      option.text = commune.name;
      option.value = commune.code;
      communeSelect.add(option);
    });
  });

  // Trigger province change event
  var event = new Event("change");
  provinceSelect.dispatchEvent(event);
}