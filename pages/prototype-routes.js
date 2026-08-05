(function (global) {
  "use strict";

  global.EBCPrototypeRoutes = {
    defaultKey: "apps",
    navigation: [
      {
        title: "平台导航",
        items: [{ route: "chat" }]
      },
      {
        title: "构建与能力",
        items: [
          { key: "build", label: "Agent 开发中心", icon: "▣", children: ["apps"] },
          { key: "capabilities", label: "能力与工具中心", icon: "✣", children: ["mcp", "tool", "skill"] }
        ]
      },
      {
        title: "知识管理中心",
        items: [{ route: "knowledge" }]
      },
      {
        title: "数据管理中心",
        items: [
          { key: "structured", label: "结构化数据接入", icon: "▥", children: ["structured-sources", "structured-tables"] },
          { key: "unstructured", label: "非结构化数据接入", icon: "▧", children: ["unstructured-sources", "unstructured-assets"] }
        ]
      },
      {
        title: "发布与集成中心",
        items: [{ route: "publish" }, { route: "integrations" }]
      },
      {
        title: "运营",
        items: [{ route: "evaluation" }, { route: "monitoring" }]
      }
    ],
    routes: {
      chat: { label: "对话测试", path: "EBC-Agent-Studio-原型-对话测试.html", icon: "◌" },
      apps: { label: "应用配置", path: "新增单agent功能/agent开发页面原型.html", icon: "▣", badge: "MVP" },
      mcp: { label: "MCP 接入", path: "EBC-Agent-Studio-MCP接入new.html", icon: "●", badge: "MVP" },
      tool: { label: "Tool 工具", path: "工具管理.dc.html", icon: "●", badge: "MVP" },
      skill: { label: "Skill 技能", path: "EBC-Agent-Studio-Skill技能管理.html", icon: "●", badge: "MVP" },
      knowledge: { label: "知识库", path: "EBC-Agent-Studio-知识库.html", icon: "▤", badge: "MVP" },
      "structured-sources": { label: "数据库连接", path: "EBC-Agent-Studio-结构化数据接入.html", icon: "●", badge: "MVP", parent: "结构化数据接入" },
      "structured-tables": { label: "库表", path: "EBC-Agent-Studio-结构化数据接入.html?view=tables", icon: "●", parent: "结构化数据接入" },
      "unstructured-sources": { label: "文件源连接", path: "EBC-Agent-Studio-非结构化数据接入.html", icon: "●", badge: "MVP", parent: "非结构化数据接入" },
      "unstructured-assets": { label: "文件", path: "EBC-Agent-Studio-非结构化数据接入.html?view=assets", icon: "●", parent: "非结构化数据接入" },
      "agent-editor": { label: "智能体编辑器", path: "新增单agent功能/Agent_Studio_智能体编辑器_dc.html", icon: "◇", immersive: true },
      publish: { label: "发布到业务端", placeholder: "「发布到业务端」原型暂未提供", icon: "◈", badge: "MVP" },
      integrations: { label: "外部集成", placeholder: "「外部集成」原型暂未提供", icon: "◈", badge: "MVP" },
      evaluation: { label: "调试与评测中心", placeholder: "「调试与评测中心」原型暂未提供", icon: "△" },
      monitoring: { label: "运营监控中心", placeholder: "「运营监控中心」原型暂未提供", icon: "▁▃▅" }
    }
  };
})(window);
