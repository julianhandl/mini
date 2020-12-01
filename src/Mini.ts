interface CustomEventListener {
    node: Element;
    event: string;
    callback: (e: Event) => void;
}

export class Mini {
    private eventListeners: CustomEventListener[] = [];
    private collection: HTMLElement[] = [];

    constructor(selector: string) {
        if (selector.indexOf(",") < 0 && selector[0] === "#") {
            this.collection.push(document.getElementById(selector));
        }
        else {
            document
                .querySelectorAll(selector)
                .forEach(element => this.collection.push(element as HTMLElement));
        }
    }

    public get length() {
        return this.collection.length;
    }

    // EventListeners

    public on(event: string, callback: (e: Event) => void) {
        this.collection.forEach(node => {
            this.eventListeners.push({
                node,
                event,
                callback
            });
            node.addEventListener(event, callback);
        })
    }

    public off(eventOrFunction: string | ((e: Event) => void), callback?: (e: Event) => void) {
        const listenersToRemove = [];

        this.eventListeners = this.eventListeners
            .filter(listener => {
                let shouldBeRemoved = false;
                if(typeof eventOrFunction === "object") {
                    shouldBeRemoved = listener.callback === eventOrFunction;
                }
                else {
                    shouldBeRemoved = listener.event === eventOrFunction;
                }

                if (callback && shouldBeRemoved) {
                    shouldBeRemoved = callback === listener.callback;
                }

                if(shouldBeRemoved) {
                    listenersToRemove.push(listener);
                }
                return !shouldBeRemoved;
            });

        listenersToRemove.forEach(e => {
            e.node.removeEventListener(e.event, e.callback);
        })
    }
}