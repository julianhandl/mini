interface CustomEventHandler {
    node: Element;
    event: string;
    callback: (e: Event) => void;
}

export class Mini {
    private eventHandlers: CustomEventHandler[] = [];
    private collection: NodeListOf<Element>;

    constructor(selector: string) {
        this.collection = document.querySelectorAll(selector);
    }

    public get length() {
        return this.collection.length;
    }

    public on(event: string, callback: (e: Event) => void) {
        this.collection.forEach(node => {
            this.eventHandlers.push({
                node,
                event,
                callback
            });
            node.addEventListener(event, callback);
        })
    }

    public off(event: string, callback?: (e: Event) => void) {
        this.eventHandlers
            .filter(e => {
                if(callback) {
                    return e.event === event && callback === e.callback;
                }
                else {
                    return e.event === event;
                }
            })
            .forEach(e => {
                e.node.removeEventListener(e.event, e.callback);
            })
    }
}