document.addEventListener("DOMContentLoaded", () => {
  const burger = document?.querySelector("[data-burger]");
  const menu = document?.querySelector("[data-menu]");
  const menuLinks = document?.querySelectorAll("[data-menu-link]");
  const body = document.querySelector(".body");

  const checkClass = () => {
    if (burger?.classList.contains("burger--active")) {
      burger?.setAttribute("aria-expanded", "true");
      burger?.setAttribute("aria-label", "закрыть меню");
    } else {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "открыть меню");
    }
  };

  burger?.addEventListener("click", (e) => {
    burger?.classList.toggle("burger--active");
    menu?.classList.toggle("header__content--active");
    body?.classList.toggle("body--active");
    checkClass();
  });

  menuLinks?.forEach((el) => {
    el.addEventListener("click", () => {
      burger?.classList.remove("burger--active");
      menu.classList.remove("header__content--active");
      body?.classList.remove("body--active");
    });
  });

  // * modal
  const modalClose = (modal) => {
    modal.querySelector(".modal__close").onclick = function () {
      modal.classList.remove("modal--active");
      body.classList.remove("body--active");
    };

    const modalContent = modal.querySelector(".modal__content");

    document.addEventListener("mousedown", (e) => {
      if (!modalContent.contains(e.target)) {
        modal.classList.remove("modal--active");
        body.classList.remove("body--active");
      }
    });
  };

  if (document.querySelector(".modal--call")) {
    const modalOpen = document.querySelectorAll(".modal-open");
    const modalCall = document.querySelector(".modal--call");

    modalOpen.forEach((item) => {
      item.addEventListener("click", () => {
        modalCall.classList.add("modal--active");
        body.classList.add("body--active");
      });
    });

    modalClose(modalCall);
  }

  // * scroll
  if (document.querySelectorAll("a[data-goto]")) {
    const menuLinks = document.querySelectorAll("a[data-goto]");

    if (menuLinks.length > 0) {
      menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", onMenuLinkClick);
      });

      function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (
          menuLink.dataset.goto &&
          document.querySelector(menuLink.dataset.goto)
        ) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue =
            gotoBlock.getBoundingClientRect().top +
            pageYOffset -
            document.querySelector(".header").offsetHeight;

          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
          });
          e.preventDefault();
        }
      }
    }
  }

  // * swiper
  if (document.querySelector(".about__swiper")) {
    return new Swiper(".about__swiper", {
      loop: true,
      speed: 800,

      navigation: {
        nextEl: ".about__button--next",
        prevEl: ".about__button--prev",
      },

      pagination: {
        el: ".about__pagination",
        clickable: true,
      },

      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: true,
        },

        560: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  }
});
