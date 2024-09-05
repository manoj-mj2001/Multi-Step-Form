function goToStep1() {
  window.location.href = "index.html";
}
function goToStep2() {
  window.location.href = "step2.html";
}
function goToStep3() {
  window.location.href = "step3.html";
}
function goToStep4() {
  window.location.href = "step4.html";
}
function goToStep5() {
  window.location.href = "step5.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const planOptions = document.querySelectorAll(".plan-option");
  const billingToggle = document.getElementById("billing-toggle");
  const billingOptions = document.querySelectorAll(".billing-option");

  const addonOptions = document.querySelectorAll(".addon-option");
  const selectedPlan = localStorage.getItem("selectedPlan");
  const isYearly = selectedPlan && selectedPlan.includes("yr");

  planOptions.forEach((option) => {
    option.addEventListener("click", function () {
      planOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  billingToggle.addEventListener("change", function () {
    const isYearly = this.checked;
    billingOptions.forEach((option) => {
      option.classList.toggle(
        "active",
        (option.dataset.billing === "yearly") === isYearly
      );
    });

    const prices = {
      arcade: { monthly: 9, yearly: 90 },
      advanced: { monthly: 12, yearly: 120 },
      pro: { monthly: 15, yearly: 150 },
    };

    planOptions.forEach((option) => {
      const plan = option.dataset.plan;
      const priceElement = option.querySelector(".plan-price");
      const price = isYearly ? prices[plan].yearly : prices[plan].monthly;
      priceElement.textContent = `$${price}/${isYearly ? "yr" : "mo"}`;
    });
  });

  addonOptions.forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]');
    const priceElement = option.querySelector(".addon-price");
    const monthlyPrice = option.dataset.monthly;
    const yearlyPrice = option.dataset.yearly;

    if (isYearly) {
      priceElement.textContent = `+$${yearlyPrice}/yr`;
    } else {
      priceElement.textContent = `+$${monthlyPrice}/mo`;
    }

    option.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      this.classList.toggle("selected", checkbox.checked);
    });
  });
});
