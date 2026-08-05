(function () {
  "use strict";

  var manifest = window.EBCPrototypeRoutes;
  if (!manifest) return;

  var nav = document.getElementById("prototypeShellNav");
  var frame = document.getElementById("prototypeShellFrame");
  var shell = document.querySelector(".prototype-shell");
  var toast = document.getElementById("prototypeShellToast");
  var toastTimer;

  function route(key) { return manifest.routes[key]; }

  function itemMarkup(key, nested) {
    var item = route(key);
    if (!item) return "";
    var cls = "prototype-nav-item" + (item.placeholder ? " is-placeholder" : "");
    return '<button class="' + cls + '" type="button" data-shell-route="' + key + '"' + (item.placeholder ? ' data-shell-placeholder="true"' : '') + '>' +
      '<span class="prototype-nav-icon">' + (nested ? "●" : item.icon || "●") + '</span>' +
      '<span>' + item.label + '</span>' +
      (item.badge ? '<span class="prototype-nav-badge">' + item.badge + '</span>' : '') +
      '</button>';
  }

  function renderNav() {
    var html = "";
    manifest.navigation.forEach(function (section) {
      html += '<div class="prototype-nav-cap">' + section.title + '</div>';
      section.items.forEach(function (node) {
        if (node.route) {
          html += itemMarkup(node.route, false);
          return;
        }
        html += '<div class="prototype-nav-group" data-shell-group="' + node.key + '">';
        html += '<button class="prototype-nav-group-head" type="button"><span class="prototype-nav-icon">' + node.icon + '</span><span>' + node.label + '</span><span class="prototype-nav-chevron">›</span></button>';
        html += '<div class="prototype-nav-sub">' + node.children.map(function (key) { return itemMarkup(key, true); }).join("") + '</div></div>';
      });
    });
    nav.innerHTML = html;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }

  function updateActive(key) {
    nav.querySelectorAll("[data-shell-route]").forEach(function (item) {
      item.classList.toggle("is-active", item.getAttribute("data-shell-route") === key);
    });
    var item = nav.querySelector('[data-shell-route="' + key + '"]');
    var group = item && item.closest(".prototype-nav-group");
    nav.querySelectorAll(".prototype-nav-group").forEach(function (node) {
      var open = node === group;
      node.classList.toggle("open", !!open);
      var head = node.querySelector(":scope > .prototype-nav-group-head");
      if (head) head.classList.toggle("is-open", !!open);
    });
  }

  function frameUrl(item) {
    var url = new URL("./pages/" + item.path, window.location.href);
    url.searchParams.set("prototypeShell", "1");
    return url.href;
  }

  function loadRoute(key) {
    var item = route(key) || route(manifest.defaultKey);
    if (item.placeholder) {
      showToast(item.placeholder);
      return;
    }
    updateActive(key);
    if (window.location.hash !== "#" + key) window.location.hash = key;
    frame.src = frameUrl(item);
  }

  nav.addEventListener("click", function (event) {
    var head = event.target.closest(".prototype-nav-group-head");
    if (head) {
      event.preventDefault();
      event.stopPropagation();
      var group = head.parentElement;
      var open = !group.classList.contains("open");
      group.classList.toggle("open", open);
      head.classList.toggle("is-open", open);
      return;
    }
    var item = event.target.closest("[data-shell-route]");
    if (!item) return;
    event.preventDefault();
    loadRoute(item.getAttribute("data-shell-route"));
  });

  window.addEventListener("hashchange", function () {
    var key = window.location.hash.slice(1) || manifest.defaultKey;
    if (!route(key)) key = manifest.defaultKey;
    updateActive(key);
    if (frame.src !== frameUrl(route(key))) frame.src = frameUrl(route(key));
  });

  window.addEventListener("message", function (event) {
    if (!event.data || event.source !== frame.contentWindow) return;
    if (event.data.type === "ebc-prototype-immersive") {
      shell.classList.toggle("is-immersive", event.data.active !== false);
      if (event.data.active !== false && window.location.hash !== "#agent-editor") {
        window.history.replaceState({}, "", "#agent-editor");
        updateActive("agent-editor");
      }
      return;
    }
    if (event.data.type === "ebc-prototype-home") {
      shell.classList.remove("is-immersive");
      loadRoute("apps");
      return;
    }
    if (event.data.type !== "ebc-prototype-route") return;
    var key = event.data.key;
    if (!route(key)) return;
    shell.classList.toggle("is-immersive", key === "agent-editor");
    updateActive(key);
    if (window.location.hash !== "#" + key) window.history.replaceState({}, "", "#" + key);
  });

  frame.addEventListener("load", function () {
    try {
      var path = decodeURIComponent(frame.contentWindow.location.pathname);
      var immersive = path.indexOf("Agent_Studio_智能体编辑器_dc.html") >= 0;
      shell.classList.toggle("is-immersive", immersive);
      if (immersive && window.location.hash !== "#agent-editor") {
        window.history.replaceState({}, "", "#agent-editor");
        updateActive("agent-editor");
      }
    } catch (e) {}
  });

  renderNav();
  loadRoute(window.location.hash.slice(1) || manifest.defaultKey);
})();
