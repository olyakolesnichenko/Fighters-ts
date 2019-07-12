"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class View {
    createElement(el) {
        return View.createElement(el);
    }
    static createElement(view) {
        const className = view.className ? view.className : '';
        const attributes = view.attributes ? view.attributes : {};
        const element = document.createElement(view.tagName);
        element.classList.add(className);
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
        return element;
    }
}
exports.default = View;
//# sourceMappingURL=view.js.map