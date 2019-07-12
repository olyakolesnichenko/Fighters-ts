interface ElemnentInterface {

    tagName: string;
    className?: string;
    attributes?: { [key: string]: string; };
}

class View {
    element: HTMLElement;

    createElement(el: ElemnentInterface) {
        return View.createElement(el);
    }

    static createElement(view: ElemnentInterface) {
        const className = view.className ? view.className : '';
        const attributes = view.attributes ? view.attributes : {};
        const element = document.createElement(view.tagName);
        element.classList.add(className);
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

        return element;
    }
}

export default View;
