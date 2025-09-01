#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Taro-Uno 图标生成脚本
用于生成一套完整、风格一致的图标库
"""

import os
import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Union
import xml.etree.ElementTree as ET
from xml.dom import minidom

# 图标配置
ICON_CONFIG = {
    "output_dir": "packages/icons",
    "categories": [
        "basic",       # 基础图标
        "brand",       # 品牌图标
        "functional"   # 功能图标
    ],
    "styles": [
        "line",        # 线性图标
        "filled",      # 面性图标
        "duotone"      # 双色图标
    ],
    "sizes": [
        16,            # 16px
        24,            # 24px
        32,            # 32px
        48             # 48px
    ],
    "colors": {
        "primary": "#1890ff",
        "secondary": "#52c41a",
        "warning": "#faad14",
        "danger": "#f5222d",
        "info": "#722ed1",
        "default": "#000000"
    }
}

# 图标定义
ICON_DEFINITIONS = {
    "basic": {
        "direction": [
            "arrow-up", "arrow-down", "arrow-left", "arrow-right",
            "caret-up", "caret-down", "caret-left", "caret-right",
            "up", "down", "left", "right",
            "expand", "collapse", "fullscreen", "fullscreen-exit"
        ],
        "alert": [
            "info", "success", "warning", "error",
            "question", "help", "notification", "message"
        ],
        "action": [
            "add", "remove", "edit", "save", "delete", "copy", "cut", "paste",
            "undo", "redo", "refresh", "reload", "sync", "download", "upload"
        ],
        "media": [
            "play", "pause", "stop", "volume-up", "volume-down", "volume-mute",
            "music", "video", "camera", "picture", "gallery"
        ],
        "editor": [
            "bold", "italic", "underline", "strikethrough", "align-left",
            "align-center", "align-right", "list-unordered", "list-ordered"
        ],
        "data": [
            "chart-line", "chart-bar", "chart-pie", "chart-area", "table",
            "database", "server", "cloud", "data-transfer"
        ],
        "navigation": [
            "home", "menu", "settings", "user", "notification", "message",
            "calendar", "clock", "history", "search", "filter"
        ],
        "feedback": [
            "loading", "spinner", "progress", "success", "error", "warning",
            "star", "heart", "thumb-up", "thumb-down", "smile", "frown"
        ]
    },
    "brand": {
        "social": [
            "wechat", "weibo", "qq", "douban", "zhihu", "tieba", "baidu",
            "github", "gitee", "gitlab", "stackoverflow", "juejin", "segmentfault"
        ],
        "payment": [
            "alipay", "wechat-pay", "unionpay"
        ],
        "ecommerce": [
            "taobao", "tmall", "jd", "pinduoduo", "meituan", "dianping"
        ],
        "tech": [
            "vuejs", "react", "angular", "typescript", "javascript", "nodejs",
            "python", "java", "go", "rust", "flutter", "taro", "uni-app"
        ]
    },
    "functional": {
        "file": [
            "file", "file-add", "file-remove", "file-edit", "file-copy",
            "file-text", "file-image", "file-video", "file-audio", "file-pdf",
            "folder", "folder-add", "folder-remove", "folder-open"
        ],
        "setting": [
            "settings", "config", "gear", "tools", "user", "profile",
            "security", "privacy", "notification", "theme"
        ],
        "communication": [
            "phone", "mail", "message", "chat", "contacts", "groups",
            "call", "video-call", "conference", "broadcast"
        ],
        "geographic": [
            "location", "map", "pin", "marker", "flag", "compass",
            "navigation", "route", "direction", "distance"
        ]
    }
}

class IconGenerator:
    """图标生成器类"""
    
    def __init__(self, config: Dict = None):
        """
        初始化图标生成器
        
        Args:
            config: 图标配置字典
        """
        self.config = config or ICON_CONFIG
        self.output_dir = Path(self.config["output_dir"])
        
    def generate_svg(self, icon_name: str, category: str, style: str, size: int) -> str:
        """
        生成SVG图标
        
        Args:
            icon_name: 图标名称
            category: 图标类别
            style: 图标风格
            size: 图标尺寸
            
        Returns:
            SVG字符串
        """
        # 创建SVG根元素
        svg = ET.Element("svg", {
            "width": str(size),
            "height": str(size),
            "viewBox": f"0 0 {size} {size}",
            "xmlns": "http://www.w3.org/2000/svg"
        })
        
        # 根据图标类别和名称生成路径
        path_data = self._get_path_data(icon_name, category, style, size)
        
        if path_data:
            # 创建路径元素
            path = ET.SubElement(svg, "path", {
                "d": path_data,
                "fill": self._get_fill_color(style),
                "stroke": self._get_stroke_color(style),
                "stroke-width": self._get_stroke_width(style, size)
            })
            
            # 如果是双色图标，添加第二个路径
            if style == "duotone":
                path_data2 = self._get_secondary_path_data(icon_name, category, style, size)
                if path_data2:
                    path2 = ET.SubElement(svg, "path", {
                        "d": path_data2,
                        "fill": self.config["colors"]["secondary"],
                        "opacity": "0.4"
                    })
        
        # 美化XML
        rough_string = ET.tostring(svg, "utf-8")
        reparsed = minidom.parseString(rough_string)
        
        return reparsed.toprettyxml(indent="  ")
    
    def _get_path_data(self, icon_name: str, category: str, style: str, size: int) -> str:
        """
        获取图标路径数据
        
        Args:
            icon_name: 图标名称
            category: 图标类别
            style: 图标风格
            size: 图标尺寸
            
        Returns:
            路径数据字符串
        """
        # 这里应该根据图标名称返回对应的SVG路径数据
        # 为了示例，我们只返回一个简单的路径
        if icon_name == "arrow-up":
            return f"M{size/2},{size*3/4} L{size/4},{size/4} L{size*3/4},{size/4} Z"
        elif icon_name == "arrow-down":
            return f"M{size/2},{size/4} L{size/4},{size*3/4} L{size*3/4},{size*3/4} Z"
        elif icon_name == "arrow-left":
            return f"M{size*3/4},{size/2} L{size/4},{size/4} L{size/4},{size*3/4} Z"
        elif icon_name == "arrow-right":
            return f"M{size/4},{size/2} L{size*3/4},{size/4} L{size*3/4},{size*3/4} Z"
        elif icon_name == "info":
            return f"M{size/2},{size/4} C{size*3/8},{size/4} {size/4},{size*3/8} {size/4},{size/2} C{size/4},{size*5/8} {size*3/8},{size*3/4} {size/2},{size*3/4} C{size*5/8},{size*3/4} {size*3/4},{size*5/8} {size*3/4},{size/2} C{size*3/4},{size*3/8} {size*5/8},{size/4} {size/2},{size/4} Z M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        elif icon_name == "success":
            return f"M{size/4},{size/2} L{size*3/8},{size*5/8} L{size*3/4},{size*3/8} Z"
        elif icon_name == "warning":
            return f"M{size/2},{size/4} L{size*3/4},{size*3/4} L{size/4},{size*3/4} Z M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        elif icon_name == "error":
            return f"M{size/4},{size/4} L{size*3/4},{size*3/4} M{size*3/4},{size/4} L{size/4},{size*3/4} Z"
        elif icon_name == "question":
            return f"M{size/2},{size/4} C{size*3/8},{size/4} {size/4},{size*3/8} {size/4},{size/2} C{size/4},{size*5/8} {size*3/8},{size*3/4} {size/2},{size*3/4} C{size*5/8},{size*3/4} {size*3/4},{size*5/8} {size*3/4},{size/2} C{size*3/4},{size*3/8} {size*5/8},{size/4} {size/2},{size/4} Z M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        else:
            # 默认返回一个圆形
            return f"M{size/2},{size/4} C{size*3/8},{size/4} {size/4},{size*3/8} {size/4},{size/2} C{size/4},{size*5/8} {size*3/8},{size*3/4} {size/2},{size*3/4} C{size*5/8},{size*3/4} {size*3/4},{size*5/8} {size*3/4},{size/2} C{size*3/4},{size*3/8} {size*5/8},{size/4} {size/2},{size/4} Z"
    
    def _get_secondary_path_data(self, icon_name: str, category: str, style: str, size: int) -> str:
        """
        获取双色图标的次要路径数据
        
        Args:
            icon_name: 图标名称
            category: 图标类别
            style: 图标风格
            size: 图标尺寸
            
        Returns:
            次要路径数据字符串
        """
        # 这里应该根据图标名称返回对应的次要SVG路径数据
        # 为了示例，我们只返回一个简单的路径
        if icon_name == "info":
            return f"M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        elif icon_name == "warning":
            return f"M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        elif icon_name == "question":
            return f"M{size/2},{size*5/8} C{size*9/32},{size*5/8} {size*7/16},{size*11/16} {size/2},{size*11/16} C{size*9/16},{size*11/16} {size*23/32},{size*5/8} {size/2},{size*5/8} Z"
        else:
            return ""
    
    def _get_fill_color(self, style: str) -> str:
        """
        获取填充颜色
        
        Args:
            style: 图标风格
            
        Returns:
            填充颜色字符串
        """
        if style == "line":
            return "none"
        elif style == "filled":
            return self.config["colors"]["default"]
        elif style == "duotone":
            return self.config["colors"]["primary"]
        else:
            return self.config["colors"]["default"]
    
    def _get_stroke_color(self, style: str) -> str:
        """
        获取描边颜色
        
        Args:
            style: 图标风格
            
        Returns:
            描边颜色字符串
        """
        if style == "line":
            return self.config["colors"]["default"]
        elif style == "filled":
            return "none"
        elif style == "duotone":
            return "none"
        else:
            return self.config["colors"]["default"]
    
    def _get_stroke_width(self, style: str, size: int) -> str:
        """
        获取描边宽度
        
        Args:
            style: 图标风格
            size: 图标尺寸
            
        Returns:
            描边宽度字符串
        """
        if style == "line":
            return str(max(1, size / 16))
        else:
            return "1"
    
    def generate_icon(self, icon_name: str, category: str, style: str, size: int) -> None:
        """
        生成单个图标文件
        
        Args:
            icon_name: 图标名称
            category: 图标类别
            style: 图标风格
            size: 图标尺寸
        """
        # 生成SVG内容
        svg_content = self.generate_svg(icon_name, category, style, size)
        
        # 创建输出目录
        output_path = self.output_dir / category / style / str(size)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # 写入文件
        file_path = output_path / f"{icon_name}.svg"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        
        print(f"Generated: {file_path}")
    
    def generate_icons(self) -> None:
        """生成所有图标"""
        # 遍历所有类别
        for category in self.config["categories"]:
            # 遍历该类别下的所有子类别
            for subcategory, icons in ICON_DEFINITIONS.get(category, {}).items():
                # 遍历所有图标
                for icon_name in icons:
                    # 遍历所有风格
                    for style in self.config["styles"]:
                        # 遍历所有尺寸
                        for size in self.config["sizes"]:
                            # 生成图标
                            self.generate_icon(icon_name, category, style, size)
    
    def generate_index(self) -> None:
        """生成图标索引文件"""
        index_data = {
            "categories": {},
            "styles": self.config["styles"],
            "sizes": self.config["sizes"]
        }
        
        # 遍历所有类别
        for category in self.config["categories"]:
            index_data["categories"][category] = {}
            
            # 遍历该类别下的所有子类别
            for subcategory, icons in ICON_DEFINITIONS.get(category, {}).items():
                index_data["categories"][category][subcategory] = icons
        
        # 写入索引文件
        index_path = self.output_dir / "index.json"
        with open(index_path, "w", encoding="utf-8") as f:
            json.dump(index_data, f, indent=2, ensure_ascii=False)
        
        print(f"Generated index: {index_path}")
    
    def generate_typescript_definitions(self) -> None:
        """生成TypeScript类型定义文件"""
        ts_content = "// tslint:disable\n// eslint-disable\n\n"
        ts_content += "/**\n"
        ts_content += " * Taro-Uno 图标库类型定义\n"
        ts_content += " * 自动生成，请勿手动修改\n"
        ts_content += " */\n\n"
        
        # 定义图标名称类型
        ts_content += "/** 所有图标名称 */\n"
        ts_content += "export type IconName = \n"
        
        icon_names = []
        for category in self.config["categories"]:
            for subcategory, icons in ICON_DEFINITIONS.get(category, {}).items():
                icon_names.extend(icons)
        
        for i, icon_name in enumerate(icon_names):
            ts_content += f"  | '{icon_name}'"
            if i < len(icon_names) - 1:
                ts_content += "\n"
        
        ts_content += ";\n\n"
        
        # 定义图标类别类型
        ts_content += "/** 图标类别 */\n"
        ts_content += "export type IconCategory = \n"
        
        for i, category in enumerate(self.config["categories"]):
            ts_content += f"  | '{category}'"
            if i < len(self.config["categories"]) - 1:
                ts_content += "\n"
        
        ts_content += ";\n\n"
        
        # 定义图标风格类型
        ts_content += "/** 图标风格 */\n"
        ts_content += "export type IconStyle = \n"
        
        for i, style in enumerate(self.config["styles"]):
            ts_content += f"  | '{style}'"
            if i < len(self.config["styles"]) - 1:
                ts_content += "\n"
        
        ts_content += ";\n\n"
        
        # 定义图标尺寸类型
        ts_content += "/** 图标尺寸 */\n"
        ts_content += "export type IconSize = \n"
        
        for i, size in enumerate(self.config["sizes"]):
            ts_content += f"  | {size}"
            if i < len(self.config["sizes"]) - 1:
                ts_content += "\n"
        
        ts_content += ";\n\n"
        
        # 定义图标接口
        ts_content += "/** 图标接口 */\n"
        ts_content += "export interface IconProps {\n"
        ts_content += "  /** 图标名称 */\n"
        ts_content += "  name: IconName;\n"
        ts_content += "  /** 图标类别 */\n"
        ts_content += "  category?: IconCategory;\n"
        ts_content += "  /** 图标风格 */\n"
        ts_content += "  style?: IconStyle;\n"
        ts_content += "  /** 图标尺寸 */\n"
        ts_content += "  size?: IconSize;\n"
        ts_content += "  /** 图标颜色 */\n"
        ts_content += "  color?: string;\n"
        ts_content += "  /** 是否旋转 */\n"
        ts_content += "  spin?: boolean;\n"
        ts_content += "  /** 点击事件 */\n"
        ts_content += "  onClick?: () => void;\n"
        ts_content += "  /** 类名 */\n"
        ts_content += "  className?: string;\n"
        ts_content += "  /** 样式 */\n"
        ts_content += "  style?: React.CSSProperties;\n"
        ts_content += "}\n\n"
        
        # 写入类型定义文件
        types_path = self.output_dir / "types.ts"
        with open(types_path, "w", encoding="utf-8") as f:
            f.write(ts_content)
        
        print(f"Generated TypeScript definitions: {types_path}")
    
    def clean_output_dir(self) -> None:
        """清理输出目录"""
        if self.output_dir.exists():
            import shutil
            shutil.rmtree(self.output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"Cleaned output directory: {self.output_dir}")
    
    def run(self) -> None:
        """运行图标生成器"""
        print("Starting icon generation...")
        
        # 清理输出目录
        self.clean_output_dir()
        
        # 生成所有图标
        self.generate_icons()
        
        # 生成索引文件
        self.generate_index()
        
        # 生成TypeScript类型定义
        self.generate_typescript_definitions()
        
        print("Icon generation completed!")

def main():
    """主函数"""
    parser = argparse.ArgumentParser(description="Generate Taro-Uno icon library")
    parser.add_argument("--config", type=str, help="Path to config file")
    parser.add_argument("--output", type=str, help="Output directory")
    args = parser.parse_args()
    
    # 加载配置
    config = ICON_CONFIG
    if args.config:
        with open(args.config, "r", encoding="utf-8") as f:
            config = json.load(f)
    
    # 更新输出目录
    if args.output:
        config["output_dir"] = args.output
    
    # 创建图标生成器并运行
    generator = IconGenerator(config)
    generator.run()

if __name__ == "__main__":
    main()