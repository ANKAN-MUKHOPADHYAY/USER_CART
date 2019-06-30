var sampleData;
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

$(document).ready(function () {
    var mobile = isMobileDevice();
    //alert(mobile);
    $.ajax({
        method: 'GET',
        url: "https://api.myjson.com/bins/tzl2b",
        success: function(data){
            sampleData = data;
            execution();
        },
        error: function(e){
            console.log(e);
        }
    })
});
var couponDiscount=0;

function execution() {
    $(".productTableBody").html("");
    renderUI(sampleData);
    var totalPrice = cartPrice(sampleData);
    if(couponDiscount > 0){
        var discountedAmount = couponApplied(totalPrice,couponDiscount);
        totalPrice = totalPrice-discountedAmount;
        $("#couponSection").removeClass("hide");
        $(".couponDiscount").html(discountedAmount);
    }
    var gstApplicable = cartGSTAmount(totalPrice);
    var payable = garandTotal(totalPrice, gstApplicable);
    renderAmount(totalPrice.toFixed(2), gstApplicable.toFixed(2), payable.toFixed(2));


}

function applyCoupon(couponVal) {
    couponVal = couponVal.toUpperCase();
    //var couponCode = ["SHOP20", "SHOP30"];
    var couponCode = {"SHOP10":10,"SHOP20":20,"SHOP30":30,"SHOP40":40};
    console.log(Object.keys(couponCode).indexOf(couponVal));
    if(Object.keys(couponCode).indexOf(couponVal) > -1){
        $(".coupon-error").hide();
        couponDiscount = couponCode[couponVal];
        execution();
    } else {
        $(".coupon-error").show();
        couponDiscount = 0; 
        $("#couponSection").addClass("hide");
        execution();
        
    }
}

function renderUI(data) {
    if (data.length > 0) {
        $.each(data, function (index, val) {
            var colorSwatch = '';
            if(val.colorOptions){
                $.each(val.colorOptions, function(a,b){
                    var className=b.replace(/\s/g,'');
                    colorSwatch += '<div class="swatchImgs '+className.toLowerCase()+'"></div>';
                });
            }
            var row = '<div class="row cartItems"><div class="col-md-3 leftBlock"><img src="' + val.productImg + '" alt="' + val.productName + '" /><div>Quantity: ' + val.qty + '</div></div><div class="col-md-8"><h5>' + val.productName + '</h5><h6><strong>' + val.brand + '</strong>&nbsp;&nbsp;&nbsp;' + val.color + '</h6><div><span class="offprice"> &#8377; ' + val.offeredPrice + '</span>&nbsp;&nbsp;&nbsp;<span class="orgprice"> &#8377; ' + val.originalPrice + '</span></div><div>'+colorSwatch+'</div></div><div class="col-md-1"><span class="delete" id="' + index + '">X</span></div></div>';
            $(".productTableBody").append(row);
        });
    }
    $(".delete").on("click", function () {
        sampleData.splice($(this).prop("id"), 1);
        execution();
    });
}
$(".coupon-button").on("click", function (e) {
    e.preventDefault();
    applyCoupon($(".coupon-field").val());
});

function cartPrice(data) {
    var totalCost = 0;
    if (data.length > 0) {
        $.each(data, function (i, v) {
            totalCost += v.qty * v.offeredPrice;
        });
        return totalCost;
    }
}

function cartGSTAmount(total) {
    return total * .18;
}

function garandTotal(a, b) {
    return a + b;
}

function renderAmount(a, b, c) {
    $(".totalAmount").html(a);
    $(".GSTAmount").html(b);
    $(".payableAmount").html(c);
}
function couponApplied(a,b) {
    return (a*b)/100;
}
