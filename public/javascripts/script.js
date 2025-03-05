(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//  tax switch toggler
let flexSwitchCheckReverse = document.querySelector("#flexSwitchCheckReverse");
let priceParas = document.querySelectorAll(".price");
let totalPriceWithTaxParas = document.querySelectorAll(".totalPriceWithTax");

for (let para of priceParas) {
  para.style.display = "none";
}

flexSwitchCheckReverse.addEventListener("click", () => {
  for (let para of priceParas) {
    if (para.style.display != "none") {
      para.style.display = "none";
    } else {
      para.style.display = "inline-block";
    }
  }
  for (let para of totalPriceWithTaxParas) {
    if (para.style.display != "none") {
      para.style.display = "none";
    } else {
      para.style.display = "inline-block";
    }
  }
});
