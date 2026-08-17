(function () {
  "use strict";

  var scriptUrl = document.currentScript && document.currentScript.src;
  var baseUrl = new URL(".", scriptUrl || window.location.href);
  var manifest = window.EBCPrototypeRoutes;
  var params = new URLSearchParams(window.location.search);
  var embedded = params.get("prototypeShell") === "1";

  function loadSharedStyles() {
    if (document.getElementById("prototypeShellStyles")) return;
    var link = document.createElement("link");
    link.id = "prototypeShellStyles";
    link.rel = "stylesheet";
    link.href = new URL("prototype-shell.css", baseUrl).href;
    document.head.appendChild(link);
  }

  function routeForPath() {
    var path = decodeURIComponent(window.location.pathname);
    var query = new URLSearchParams(window.location.search);
    if (path.indexOf("EBC-Agent-Studio-MCP接入new.html") >= 0) return "mcp";
    if (path.indexOf("工具管理.dc.html") >= 0) return "tool";
    if (path.indexOf("EBC-Agent-Studio-Skill技能管理.html") >= 0) return "skill";
    if (path.indexOf("EBC-Agent-Studio-知识管理中心-知识库.html") >= 0) return "knowledge";
    if (path.indexOf("EBC-Agent-Studio-原型-对话测试.html") >= 0) return "chat";
    if (path.indexOf("EBC-Agent-Studio-结构化数据接入.html") >= 0) return query.get("view") === "tables" ? "structured-tables" : "structured-sources";
    if (path.indexOf("EBC-Agent-Studio-非结构化数据接入.html") >= 0) return query.get("view") === "assets" ? "unstructured-assets" : "unstructured-sources";
    if (path.indexOf("agent开发页面原型.html") >= 0) return "apps";
    return "";
  }

  function cleanText(value) { return (value || "").replace(/\s+/g, " ").trim(); }

  function routeMarkup(key, nested) {
    var route = manifest.routes[key];
    if (!route) return "";
    var cls = "nav-item prototype-nav-item" + (route.placeholder ? " is-placeholder" : "");
    return '<div class="' + cls + '" data-prototype-route="' + key + '"' + (route.placeholder ? ' data-prototype-placeholder="true"' : '') + '>' +
      '<span class="prototype-nav-icon">' + (nested ? "●" : route.icon || "●") + '</span>' +
      '<span>' + route.label + '</span>' +
      (route.badge ? '<span class="prototype-nav-badge">' + route.badge + '</span>' : '') +
      '</div>';
  }

  function groupMarkup(key, label, icon, items, open) {
    return '<div class="nav-group prototype-nav-group' + (open ? " open" : "") + '" data-prototype-group="' + key + '">' +
      '<div class="ng-head prototype-nav-group-head" role="button" tabindex="0"><span class="ico prototype-nav-icon">' + icon + '</span><span>' + label + '</span><span class="chev prototype-nav-chevron">›</span></div>' +
      '<div class="ng-sub prototype-nav-sub">' + items.map(function (item) { return routeMarkup(item, true); }).join("") + '</div>' +
      '</div>';
  }

  function renderNav(nav) {
    var current = routeForPath();
    var html = "";
    manifest.navigation.forEach(function (section) {
      html += '<div class="nav-cap prototype-nav-cap">' + section.title + '</div>';
      section.items.forEach(function (node) {
        if (node.route) {
          html += routeMarkup(node.route, false);
          return;
        }
        html += groupMarkup(node.key, node.label, node.icon, node.children, node.children.indexOf(current) >= 0);
      });
    });
    nav.innerHTML = html;
  }

  function markShellChrome(nav) {
    var sidebar = nav.closest("aside") || nav.closest("[class*=sidebar]");
    if (sidebar) {
      sidebar.setAttribute("data-prototype-sidebar", "true");
      sidebar.style.setProperty("display", "none", "important");
      sidebar.style.setProperty("width", "0", "important");
      sidebar.style.setProperty("flex-basis", "0", "important");
    }
    var main = sidebar && sidebar.nextElementSibling;
    if (main) {
      main.setAttribute("data-prototype-main", "true");
      main.style.setProperty("width", "100%", "important");
      main.style.setProperty("min-width", "0", "important");
      main.style.setProperty("flex", "1 1 auto", "important");
      var header = main.querySelector(":scope > header") || main.querySelector(".topbar");
      if (header) {
        header.setAttribute("data-prototype-page-header", "true");
        header.style.setProperty("height", "58px", "important");
        header.style.setProperty("flex-basis", "58px", "important");
        header.style.setProperty("padding-left", "22px", "important");
        header.style.setProperty("padding-right", "22px", "important");
      }
    }
    document.documentElement.setAttribute("data-prototype-embedded", "true");
    syncParentRoute();
  }

  function syncParentRoute() {
    if (!embedded || window.parent === window) return;
    try {
      window.parent.postMessage({ type: "ebc-prototype-route", key: routeForPath() }, "*");
    } catch (e) {}
  }

  function patchHistoryForShell() {
    if (!embedded || window.__ebcPrototypeHistoryPatched) return;
    window.__ebcPrototypeHistoryPatched = true;
    ["pushState", "replaceState"].forEach(function (method) {
      var original = window.history[method];
      window.history[method] = function () {
        var result = original.apply(this, arguments);
        setTimeout(syncParentRoute, 0);
        return result;
      };
    });
    window.addEventListener("popstate", syncParentRoute);
  }

  function currentRouteItem(target) {
    var node = target && target.closest && target.closest("[data-prototype-route]");
    return node && node.closest("nav") ? node : null;
  }

  function showToast(message) {
    var toast = document.getElementById("prototypeNavToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "prototypeNavToast";
      toast.setAttribute("role", "status");
      toast.style.cssText = "position:fixed;right:24px;top:76px;z-index:100000;max-width:420px;padding:11px 16px;border-radius:9px;background:#1f2a44;color:#fff;box-shadow:0 8px 26px rgba(15,28,55,.22);font-size:13px;line-height:1.5;opacity:0;transform:translateY(-8px);pointer-events:none;transition:opacity .18s ease,transform .18s ease";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { toast.style.opacity = "0"; toast.style.transform = "translateY(-8px)"; }, 2400);
  }

  function enhance() {
    loadSharedStyles();
    var nav = document.querySelector("nav");
    if (!nav || !manifest) return;
    if (embedded) {
      patchHistoryForShell();
      markShellChrome(nav);
      return;
    }
    if (nav.getAttribute("data-prototype-nav-mounted") !== "true") {
      nav.setAttribute("data-prototype-nav-mounted", "true");
      renderNav(nav);
    }
    var active = routeForPath();
    nav.querySelectorAll("[data-prototype-route]").forEach(function (item) {
      var isActive = item.getAttribute("data-prototype-route") === active;
      item.classList.toggle("is-active", isActive);
      item.classList.toggle("prototype-nav-active", isActive);
    });
  }

  document.addEventListener("click", function (event) {
    var nav = event.target && event.target.closest && event.target.closest("nav");
    if (!nav || embedded) return;
    var head = event.target.closest(".ng-head");
    if (head) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var group = head.parentElement;
      var open = !group.classList.contains("open");
      group.classList.toggle("open", open);
      head.classList.toggle("is-open", open);
      return;
    }
    var item = currentRouteItem(event.target);
    if (!item) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    var key = item.getAttribute("data-prototype-route");
    var route = manifest.routes[key];
    if (!route) return;
    if (route.placeholder) {
      showToast(route.placeholder);
      return;
    }
    window.location.href = new URL(route.path, baseUrl).href;
  }, true);

  if (document.readyState === "loading") {
    enhance();
    document.addEventListener("DOMContentLoaded", enhance);
  } else {
    enhance();
  }
  new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true });
})();
