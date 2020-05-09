window.dom = {
    //创建节点
    create(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    //在节点后插入兄弟节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    //在节点前插入兄弟节点
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    //新增儿子
    append(parent, node) {
        parent.appendChild(node)
    },
    //新增爸爸
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //删除节点
    remove(node) {
        node.parentNode.removeChild(node)
    },
    //删除子节点
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild//直到第一个子节点不存在，即删除所有子节点，循环结束
        }
        return array
    },
    //读写节点属性值
    attr(node, name, value) {//根据参数个数写不同代码，叫重载
        if (arguments.length === 3) {//传入三个参数则
            node.setAttribute(name, value)
        } else if (arguments.length == 2) {//传入两个参数则
            return node.getAttribute(name)
        }
    },
    //读写文本内容
    text(node, string) {
        if (arguments === 2) {
            if ("innerText" in node) {//根据不同浏览器写不同代码，叫适配
                node.innerText = string //ie
            } else {
                node.textContent = string  //firefox  Chrome
            }
        } else if (arguments === 1) {
            if ("innerText" in node) {//根据不同浏览器写不同代码，叫适配
                return node.innerText  //ie
            } else {
                return node.textContent  //firefox  Chrome
            }
        }
    },
    //修改HTML内容
    html(node, string) {
        if (arguments === 2) {
            node.innerHTML = string
        } else if (arguments === 1) {
            return node.innerHTML
        }
    },
    //修改样式
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === "string") {
                return node.style[name]
            } else if (name instanceof Object) {
                const Object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    //修改class属性
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //添加删除事件
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    }

}
// window.dom
// dom.create = ()=>{}