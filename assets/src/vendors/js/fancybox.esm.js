// @fancyapps/ui/Fancybox v4.0.0-alpha.4
const t = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
    e = (...i) => { let s = !1; "boolean" == typeof i[0] && (s = i.shift()); let n = i[0]; if (!n || "object" != typeof n) throw new Error("extendee must be an object"); const o = i.slice(1),
            a = o.length; for (let i = 0; i < a; i++) { const a = o[i]; for (let i in a)
                if (a.hasOwnProperty(i)) { const o = a[i]; if (s && (Array.isArray(o) || t(o))) { const t = Array.isArray(o) ? [] : {};
                        n[i] = e(!0, n.hasOwnProperty(i) ? n[i] : t, o) } else n[i] = o } } return n },
    i = (t, e = 1e3) => (t = parseFloat(t) || 0, Math.round((t + Number.EPSILON) * e) / e),
    s = "undefined" != typeof window && window.ResizeObserver || class { constructor(t) { this.observables = [], this.boundCheck = this.check.bind(this), this.boundCheck(), this.callback = t }
        observe(t) { if (this.observables.some((e => e.el === t))) return; const e = { el: t, size: { height: t.clientHeight, width: t.clientWidth } };
            this.observables.push(e) }
        unobserve(t) { this.observables = this.observables.filter((e => e.el !== t)) }
        disconnect() { this.observables = [] }
        check() { const t = this.observables.filter((t => { const e = t.el.clientHeight,
                    i = t.el.clientWidth; if (t.size.height !== e || t.size.width !== i) return t.size.height = e, t.size.width = i, !0 })).map((t => t.el));
            t.length > 0 && this.callback(t), window.requestAnimationFrame(this.boundCheck) } },
    n = function(t) { return !(!t || t.classList.contains("carousel__track") || t === document.body) && (function(t) { const e = window.getComputedStyle(t)["overflow-y"],
                i = window.getComputedStyle(t)["overflow-x"],
                s = ("scroll" === e || "auto" === e) && Math.abs(t.scrollHeight - t.clientHeight) > 1,
                n = ("scroll" === i || "auto" === i) && Math.abs(t.scrollWidth - t.clientWidth) > 1; return s || n }(t) ? t : n(t.parentNode)) },
    o = t => { let e = 0; return t && (e = t instanceof SVGElement ? Math.min(t.getClientRects()[0].width, t.width.baseVal.value) : Math.max(t.offsetWidth, t.scrollWidth)), e },
    a = t => { let e = 0; return t && (e = t instanceof SVGElement ? Math.min(t.getClientRects()[0].height, t.height.baseVal.value) : Math.max(t.offsetHeight, t.scrollHeight)), e };
class r { constructor(t = {}) { this.options = e(!0, {}, t), this.plugins = [], this.events = {}; for (const t of["on", "once"])
            for (const e of Object.entries(this.options[t] || {})) this[t](...e) }
    option(t, e) { t = String(t); let i = (s = t, n = this.options, s.split(".").reduce((function(t, e) { return t[e] }), n)); var s, n; return "function" == typeof i && (i = i.call(this, t)), void 0 === i ? e : i }
    localize(t, e = []) { return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, i, s) => { let n = !1; if (n = s ? this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${s}`) : this.option(`l10n.${i}`), !n) return i; for (let t = 0; t < e.length; t++) n = n.split(e[t][0]).join(e[t][1]); return n })) }
    on(e, i) { if (t(e)) { for (const t of Object.entries(e)) this.on(...t); return this } return String(e).split(" ").forEach((t => { const e = this.events[t] = this.events[t] || []; - 1 == e.indexOf(i) && e.push(i) })), this }
    once(e, i) { if (t(e)) { for (const t of Object.entries(e)) this.once(...t); return this } return String(e).split(" ").forEach((t => { const e = (...s) => { this.off(t, e), i.call(this, this, ...s) };
            e._ = i, this.on(t, e) })), this }
    off(e, i) { if (!t(e)) return e.split(" ").forEach((t => { const e = this.events[t]; if (!e || !e.length) return this; let s = -1; for (let t = 0, n = e.length; t < n; t++) { const n = e[t]; if (n && (n === i || n._ === i)) { s = t; break } } - 1 != s && e.splice(s, 1) })), this; for (const t of Object.entries(e)) this.off(...t) }
    trigger(t, ...e) { for (const i of[...this.events[t] || []].slice())
            if (i && !1 === i.call(this, this, ...e)) return !1;
        for (const i of[...this.events["*"] || []].slice())
            if (i && !1 === i.call(this, t, this, ...e)) return !1;
        return !0 }
    attachPlugins(t) { const i = {}; for (const [s, n] of Object.entries(t || {})) !1 !== this.options[s] && (this.options[s] = e({}, n.defaults || {}, this.options[s]), i[s] = new n(this)); for (const [t, e] of Object.entries(i)) e.attach(this); return this.plugins = Object.assign({}, this.plugins, i), this }
    detachPlugins() { for (const t in this.plugins) { let e;
            (e = this.plugins[t]) && "function" == typeof e.detach && e.detach(this) } return this.plugins = {}, this } }
const l = { panOnlyZoomed: !1, lockAxis: !1, friction: .72, decelFriction: .92, zoomFriction: .72, bounceForce: .1, baseScale: 1, minScale: 1, maxScale: 2, step: .5, zoomInCentered: !0, pinchToZoom: !0, textSelection: !0, click: "toggleZoom", clickDelay: 250, doubleClick: !1, wheel: "zoom", wheelFactor: 30, wheelLimit: 3, touch: !0, draggableClass: "is-draggable", draggingClass: "is-dragging" };
class h extends r { constructor(t, i = {}) { if (super(i = e(!0, {}, l, i)), !(t instanceof HTMLElement)) throw new Error("Viewport not found");
        this.state = "init", this.$viewport = t; for (const t of["onPointerDown", "onPointerMove", "onPointerUp", "onWheel", "onClick"]) this[t] = this[t].bind(this); if (this.$content = this.option("content"), this.$content || (this.$content = this.$viewport.querySelector(".panzoom__content")), !this.$content) throw new Error("Content not found"); if (!1 === this.option("textSelection") && this.$viewport.classList.add("not-selectable"), this.resetValues(), this.attachPlugins(h.Plugins), this.trigger("init"), this.handleContent(), this.attachEvents(), this.trigger("ready"), "init" === this.state) { const t = this.option("baseScale");
            1 === t ? (this.state = "ready", this.handleCursor()) : this.panTo({ scale: t, friction: 0 }) } }
    handleContent() { if (this.$content instanceof HTMLImageElement) { const t = () => { const t = this.$content.naturalWidth;
                this.maxScale = this.option("maxScale"), this.options.maxScale = function() { const e = this.contentDim.width; return t > 0 && e > 0 ? t / e * this.maxScale : this.maxScale }, this.updateMetrics(), this.trigger(t > 0 ? "load" : "error") };!0 !== this.$content.complete ? (this.$content.onload = () => t(), this.$content.onerror = () => t()) : t() } else this.updateMetrics() }
    resetValues() { this.viewportDim = { top: 0, left: 0, width: 0, height: 0 }, this.contentDim = { width: 0, height: 0 }, this.friction = this.option("friction"), this.current = { x: 0, y: 0, scale: 1 }, this.velocity = { x: 0, y: 0, scale: 0 }, this.pan = { x: 0, y: 0, scale: 1 }, this.drag = { startTime: null, firstPosition: null, startPosition: null, startPoint: null, startDistance: null, endPosition: null, endPoint: null, distance: 0, distanceX: 0, distanceY: 0, elapsedTime: 0 }, this.lockAxis = null, this.pendingAnimateUpdate = null, this.pendingResizeUpdate = null, this.pointers = [] }
    updateMetrics() { let { top: t, left: e, width: i, height: s } = this.$viewport.getBoundingClientRect(); const n = window.getComputedStyle(this.$viewport);
        i -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight), s -= parseFloat(n.paddingTop) + parseFloat(n.paddingBottom), this.viewportDim = { top: t, left: e, width: i, height: s }, this.contentDim = { width: this.option("width", o(this.$content)), height: this.option("hidth", a(this.$content)) }, this.trigger("updateMetrics"), this.updateBounds() }
    updateBounds(t) { const e = { from: 0, to: 0 },
            s = { from: 0, to: 0 }; if (t || (t = this.velocity.scale ? this.pan.scale : this.current.scale), t < 1) return [e, s]; const n = this.contentDim,
            o = this.viewportDim,
            a = n.width * t,
            r = n.height * t; return e.to = i(.5 * (a - n.width)), n.width > o.width ? e.from = i(e.to + o.width - a) : e.from = i(-1 * e.to), s.to = i(.5 * (r - n.height)), n.height > o.height ? s.from = i(s.to + o.height - r) : s.from = i(-1 * s.to), this.boundX = e, this.boundY = s, this.trigger("updateBounds", t), [this.boundX, this.boundY] }
    zoomIn(t) { this.zoomTo(this.current.scale + (t || this.option("step"))) }
    zoomOut(t) { this.zoomTo(this.current.scale - (t || this.option("step"))) }
    toggleZoom(t = {}) { const e = this.option("maxScale"),
            i = this.option("baseScale");
        this.zoomTo(this.current.scale > i + .5 * (e - i) ? i : e, t) }
    zoomTo(t, e = {}) { let { x: i = null, y: s = null, friction: n = this.option("zoomFriction") } = e;
        t || (t = this.option("baseScale")), t = Math.max(Math.min(t, this.option("maxScale")), this.option("minScale")); const o = this.contentDim.width,
            a = this.contentDim.height,
            r = o * this.current.scale,
            l = a * this.current.scale,
            h = o * t,
            c = a * t;
        null === i && (i = .5 * r), null === s && (s = .5 * l), !1 === this.option("zoomInCentered") && (i < .5 * r && (i = r), i > r && (i = 0), s < 0 && (s = l), s > l && (s = 0)); let d = (h - r) * ((r > 0 ? i / r : 0) - .5),
            u = (c - l) * ((l > 0 ? s / l : 0) - .5);
        Math.abs(d) < 1 && (d = 0), Math.abs(u) < 1 && (u = 0), i = this.current.x - d, s = this.current.y - u, this.panTo({ x: i, y: s, scale: t, friction: n }) }
    panTo(t) { let { x: e = 0, y: i = 0, scale: s = this.current.scale, friction: n = this.option("friction"), ignoreBounds: o = !1 } = t; if (n || this.stopMoving(), !0 !== o) { const [t, n] = this.updateBounds(s);
            t && (e = Math.max(Math.min(e, t.to), t.from)), n && (i = Math.max(Math.min(i, n.to), n.from)) } return n > 0 && (Math.abs(e - this.current.x) > .1 || Math.abs(i - this.current.y) > .1 || Math.abs(s - this.current.scale) > .1) ? (this.state = "panning", this.friction = n, this.pan = { x: e, y: i, scale: s }, this.velocity = { x: (1 / this.friction - 1) * (e - this.current.x), y: (1 / this.friction - 1) * (i - this.current.y), scale: (1 / this.friction - 1) * (s - this.current.scale) }, this.animate(), this) : (this.pendingAnimateUpdate && (cancelAnimationFrame(this.pendingAnimateUpdate), this.pendingAnimateUpdate = null), this.state = "ready", this.stopMoving(), this.current = { x: e, y: i, scale: s }, this.transform(), this.handleCursor(), this.trigger("afterAnimate", !0), this) }
    animate() { if (!this.pendingAnimateUpdate) { if (this.applyBoundForce(), this.applyDragForce(), this.velocity.x *= this.friction, this.velocity.y *= this.friction, this.velocity.scale *= this.friction, this.current.x += this.velocity.x, this.current.y += this.velocity.y, this.current.scale += this.velocity.scale, "dragging" == this.state || "pointerdown" == this.state || Math.abs(this.velocity.x) > .05 || Math.abs(this.velocity.y) > .05 || Math.abs(this.velocity.scale) > .05) return this.transform(), void(this.pendingAnimateUpdate = requestAnimationFrame((() => { this.pendingAnimateUpdate = null, this.animate() })));
            this.current.x = i(this.current.x + this.velocity.x / (1 / this.friction - 1)), this.current.y = i(this.current.y + this.velocity.y / (1 / this.friction - 1)), Math.abs(this.current.x) < .5 && (this.current.x = 0), Math.abs(this.current.y) < .5 && (this.current.y = 0), this.current.scale = i(this.current.scale + this.velocity.scale / (1 / this.friction - 1), 1e4), Math.abs(this.current.scale - 1) < .01 && (this.current.scale = 1), this.state = "ready", this.stopMoving(), this.transform(), this.handleCursor(), this.trigger("afterAnimate") } }
    handleCursor() { const t = this.option("draggableClass");
        t && this.option("touch") && (this.contentDim.width <= this.viewportDim.width && 1 == this.option("panOnlyZoomed") && this.current.scale <= this.option("baseScale") ? this.$viewport.classList.remove(t) : this.$viewport.classList.add(t)) }
    isMoved() { return 0 !== this.current.x || 0 !== this.current.y || 1 !== this.current.scale || this.velocity.x > 0 || this.velocity.y > 0 || this.velocity.scale > 0 }
    stopMoving() { this.velocity = { x: 0, y: 0, scale: 0 } }
    transform() { this.trigger("beforeTransform"); const t = i(this.current.x, 100),
            e = i(this.current.y, 100),
            s = i(this.current.scale, 1e4);
        Math.abs(t) <= .1 && Math.abs(e) <= .1 && Math.abs(s - 1) <= .1 ? this.$content.style.transform = "" : this.$content.style.transform = `translate(${t}px, ${e}px) scale(${s})`, this.trigger("afterTransform") }
    applyBoundForce() { if ("decel" !== this.state) return; const t = { x: 0, y: 0 },
            e = this.option("bounceForce"),
            i = this.boundX,
            s = this.boundY; let n, o, a, r; if (i && (n = this.current.x < i.from, o = this.current.x > i.to), s && (a = this.current.y < s.from, r = this.current.y > s.to), n || o) { const s = (n ? i.from : i.to) - this.current.x; let a = s * e; const r = this.current.x + (this.velocity.x + a) / (1 / this.friction - 1);
            n && r < i.from || o && r > i.to || (a = s * e - this.velocity.x), t.x = a } if (a || r) { const i = (a ? s.from : s.to) - this.current.y; let n = i * e; const o = this.current.y + (this.velocity.y + n) / (1 / this.friction - 1);
            a && o < s.from || r && o > s.to || (n = i * e - this.velocity.y), t.y = n }
        this.velocity.x += t.x, this.velocity.y += t.y }
    applyDragForce() { "dragging" === this.state && (this.velocity = { x: (1 / this.friction - 1) * (this.drag.endPosition.x - this.current.x), y: (1 / this.friction - 1) * (this.drag.endPosition.y - this.current.y), scale: (1 / this.friction - 1) * (this.drag.endPosition.scale - this.current.scale) }) }
    attachEvents() { const t = this.$viewport;
        this.resizeObserver = this.resizeObserver || new s((t => { this.pendingResizeUpdate = this.pendingResizeUpdate || setTimeout((() => { let e = t && t[0].contentRect;!e && this.$viewport && (e = this.$viewport.getBoundingClientRect()), e && (Math.abs(e.width - this.viewportDim.width) > 1 || Math.abs(e.height - this.viewportDim.height) > 1) && this.updateMetrics(), this.pendingResizeUpdate = null }), this.option("updateRate", 250)) })), this.resizeObserver.observe(t), t.addEventListener("click", this.onClick, { passive: !1 }), t.addEventListener("wheel", this.onWheel, { passive: !1 }), this.option("touch") && (window.PointerEvent ? (t.addEventListener("pointerdown", this.onPointerDown, { passive: !1 }), t.addEventListener("pointermove", this.onPointerMove, { passive: !1 }), t.addEventListener("pointerup", this.onPointerUp), t.addEventListener("pointercancel", this.onPointerUp)) : (t.addEventListener("touchstart", this.onPointerDown, { passive: !1 }), t.addEventListener("touchmove", this.onPointerMove, { passive: !1 }), t.addEventListener("touchend", this.onPointerUp), t.addEventListener("touchcancel", this.onPointerUp), t.addEventListener("mousedown", this.onPointerDown))) }
    detachEvents() { this.resizeObserver && this.resizeObserver.disconnect(), this.resizeObserver = null, this.pendingResizeUpdate && (clearTimeout(this.pendingResizeUpdate), this.pendingResizeUpdate = null); const t = this.$viewport;
        window.PointerEvent ? (t.removeEventListener("pointerdown", this.onPointerDown, { passive: !1 }), t.removeEventListener("pointermove", this.onPointerMove, { passive: !1 }), t.removeEventListener("pointerup", this.onPointerUp), t.removeEventListener("pointercancel", this.onPointerUp)) : (t.removeEventListener("touchstart", this.onPointerDown, { passive: !1 }), t.removeEventListener("touchmove", this.onPointerMove, { passive: !1 }), t.removeEventListener("touchend", this.onPointerUp), t.removeEventListener("touchcancel", this.onPointerUp), t.removeEventListener("mousedown", this.onPointerDown)), t.removeEventListener("click", this.onClick, { passive: !1 }), t.removeEventListener("wheel", this.onWheel, { passive: !1 }) }
    copyPointer(t) { return { pointerId: t.pointerId, clientX: t.clientX, clientY: t.clientY } }
    findPointerIndex(t) { let e = this.pointers.length; for (; e--;)
            if (this.pointers[e].pointerId === t.pointerId) return e;
        return -1 }
    addPointer(t) { let e = 0; if (t.touches && t.touches.length)
            for (const i of t.touches) i.pointerId = e++, this.addPointer(i);
        else e = this.findPointerIndex(t), e > -1 && this.pointers.splice(e, 1), this.pointers.push(t) }
    removePointer(t) { if (t.touches) { for (; this.pointers.length;) this.pointers.pop(); return } const e = this.findPointerIndex(t);
        e > -1 && this.pointers.splice(e, 1) }
    getMiddlePoint() { let t = [...this.pointers];
        t = t.sort(((t, e) => e.pointerId - t.pointerId)); const e = t.shift(),
            i = t.shift(); return i ? { clientX: .5 * (e.clientX - i.clientX) + i.clientX, clientY: .5 * (e.clientY - i.clientY) + i.clientY } : { clientX: e ? e.clientX : 0, clientY: e ? e.clientY : 0 } }
    getDistance(t, e) { if (!(t = (t = t || [...this.pointers]).slice()) || t.length < 2) return 0; const i = (t = t.sort(((t, e) => e.pointerId - t.pointerId))).shift(),
            s = t.shift(),
            n = Math.abs(s.clientX - i.clientX); if ("x" === e) return n; const o = Math.abs(s.clientY - i.clientY); return "y" === e ? o : Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2)) }
    resetDragState() { const { left: t, top: i } = this.$content.getClientRects()[0], s = this.getMiddlePoint(), n = { top: i, left: t, x: this.current.x, y: this.current.y, scale: this.current.scale };
        e(this.drag, { startPosition: e({}, n), startPoint: e({}, s), startDistance: this.getDistance(), endPosition: e({}, n), endPoint: e({}, s), distance: 0, distanceX: 0, distanceY: 0 }), "pointerdown" === this.state && (this.lockAxis = null, this.drag.startTime = new Date, this.drag.firstPosition = Object.assign({}, n)), this.stopMoving(), this.friction = this.option("friction") }
    onPointerDown(t) { if (t && !(t.button && t.button > 0))
            if (this.option("panOnlyZoomed") && this.velocity.scale) t.preventDefault();
            else { if (this.resetDragState(), !this.pointers.length) { if (-1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(t.target.nodeName)) return; if (this.option("textSelection") && ((t, e, i) => { const s = t.childNodes,
                                n = document.createRange(); for (let t = 0; t < s.length; t++) { const o = s[t]; if (o.nodeType !== Node.TEXT_NODE) continue;
                                n.selectNodeContents(o); const a = n.getBoundingClientRect(); if (e >= a.left && i >= a.top && e <= a.right && i <= a.bottom) return o } return !1 })(t.target, t.clientX, t.clientY)) return; if (n(t.target)) return } if ((() => { const t = window.getSelection ? window.getSelection() : document.selection;
                        t && t.rangeCount && t.getRangeAt(0).getClientRects().length && (t.removeAllRanges ? t.removeAllRanges() : t.empty && t.empty()) })(), this.pointers.length > 1 || this.pointers.length && this.lockAxis) t.preventDefault();
                else if (!1 !== this.trigger("touchStart", t))
                    if (t.preventDefault(), this.state = "pointerdown", this.addPointer(this.copyPointer(t)), this.resetDragState(), window.PointerEvent) try { t.target.setPointerCapture(t.pointerId) } catch (t) {} else document.addEventListener("mousemove", this.onPointerMove, { passive: !1 }), document.addEventListener("mouseup", this.onPointerUp, { passive: !1 }) } }
    onPointerMove(t) { if (t.targetTouches && t.targetTouches.length > 1) return; if ("pointerdown" !== this.state && "dragging" !== this.state) return; if (0 == this.trigger("touchMove", t)) return void t.preventDefault(); if (this.addPointer(this.copyPointer(t)), this.pointers.length > 1 && !1 === this.option("pinchToZoom")) return; if (1 == this.option("panOnlyZoomed") && this.current.scale === this.option("baseScale") && this.pointers.length < 2) return void t.preventDefault(); const e = this.getMiddlePoint(),
            i = [e, this.drag.startPoint];
        this.drag.distance = this.getDistance(i); const s = this.events.click && this.events.click.length || this.events.doubleClick && this.events.doubleClick.length || this.option.click || this.option.doubleClick; if (this.drag.distance < 6 && (s || this.option("lockAxis") && !this.lockAxis)) return; if ("pointerdown" == this.state && (this.state = "dragging"), "dragging" !== this.state) return; const n = this.option("lockAxis"); if (!this.lockAxis && n)
            if ("xy" === n) { const t = this.getDistance(i, "x"),
                    e = this.getDistance(i, "y"),
                    s = Math.abs(180 * Math.atan2(e, t) / Math.PI);
                this.lockAxis = s > 45 && s < 135 ? "y" : "x" } else this.lockAxis = n;
        t.preventDefault(), t.stopPropagation(), this.$viewport.classList.add(this.option("draggingClass")), this.animate(); let o = this.current.scale,
            a = 0,
            r = 0; if (this.current.scale === this.option("baseScale") && "y" === this.lockAxis || (a = e.clientX - this.drag.startPoint.clientX), this.current.scale === this.option("baseScale") && "x" === this.lockAxis || (r = e.clientY - this.drag.startPoint.clientY), this.drag.endPosition.x = this.drag.startPosition.x + a, this.drag.endPosition.y = this.drag.startPosition.y + r, this.pointers.length > 1) { this.drag.middlePoint = e, o = this.drag.startPosition.scale * this.getDistance() / this.drag.startDistance, o = Math.max(Math.min(o, 2 * this.option("maxScale")), .5 * this.option("minScale")); const t = this.$content.width,
                i = this.$content.height,
                s = t * this.drag.startPosition.scale,
                n = i * this.drag.startPosition.scale,
                a = i * o,
                r = (t * o - s) * ((this.drag.startPoint.clientX - this.drag.startPosition.left) / s - .5),
                l = (a - n) * ((this.drag.startPoint.clientY - this.drag.startPosition.top) / n - .5);
            this.drag.endPosition.x -= r, this.drag.endPosition.y -= l, this.drag.endPosition.scale = o, this.updateBounds(o) }
        this.applyDragResistance() }
    onPointerUp(t) { if (this.removePointer(t), window.PointerEvent) try { t.target.releasePointerCapture(t.pointerId) } catch (t) {} else document.removeEventListener("mousemove", this.onPointerMove, { passive: !1 }), document.removeEventListener("mouseup", this.onPointerUp, { passive: !1 }); if (this.pointers.length > 0) return t.preventDefault(), void this.resetDragState(); if ("pointerdown" !== this.state && "dragging" !== this.state) return;
        this.$viewport.classList.remove(this.option("draggingClass")); const { top: i, left: s } = this.$content.getClientRects()[0], n = this.drag; if (e(!0, n, { elapsedTime: new Date - n.startTime, distanceX: n.endPosition.x - n.firstPosition.x, distanceY: n.endPosition.y - n.firstPosition.y, endPosition: { top: i, left: s } }), n.distance = Math.sqrt(Math.pow(n.distanceX, 2) + Math.pow(n.distanceY, 2)), this.state = "decel", this.friction = this.option("decelFriction"), this.pan = { x: this.current.x + this.velocity.x / (1 / this.friction - 1), y: this.current.y + this.velocity.y / (1 / this.friction - 1), scale: this.current.scale + this.velocity.scale / (1 / this.friction - 1) }, !1 === this.trigger("touchEnd", t)) return; if ("decel" !== this.state) return; const o = this.option("minScale"); if (this.current.scale < o) return void this.zoomTo(o, { friction: .64 }); const a = this.option("maxScale"); if (this.current.scale - a > .01) { const t = { friction: .64 };
            n.middlePoint && (t.x = n.middlePoint.clientX - s, t.y = n.middlePoint.clientY - i), this.zoomTo(a, t) } }
    applyDragResistance() { const t = this.boundX,
            e = this.boundY; let i, s, n, o; if (t && (i = this.drag.endPosition.x < t.from, s = this.drag.endPosition.x > t.to), e && (n = this.drag.endPosition.y < e.from, o = this.drag.endPosition.y > e.to), i || s) { const e = i ? t.from : t.to,
                s = this.drag.endPosition.x - e;
            this.drag.endPosition.x = e + .3 * s } if (n || o) { const t = n ? e.from : e.to,
                i = this.drag.endPosition.y - t;
            this.drag.endPosition.y = t + .3 * i } }
    onWheel(t) {!1 !== this.trigger("wheel", t) && "zoom" == this.option("wheel", t) && this.zoomWithWheel(t) }
    zoomWithWheel(t) { void 0 === this.changedDelta && (this.changedDelta = 0); let e = this.current.scale; const i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || t.wheelDelta || -t.detail)); if (i < 0 && e <= this.option("minScale") || i > 0 && e >= this.option("maxScale")) { if (this.changedDelta += Math.abs(i), this.changedDelta > this.option("wheelLimit")) return } else this.changedDelta = 0;
        e = e * (100 + i * this.option("wheelFactor")) / 100, t.preventDefault(); const { top: s, left: n } = this.$content.getClientRects()[0], o = t.clientX - n, a = t.clientY - s;
        this.zoomTo(e, { x: o, y: a }) }
    onClick(t) { if (t.defaultPrevented) return; if (window.getSelection().toString().length) return t.stopPropagation(), void t.stopImmediatePropagation(); if (this.drag.startPosition && this.drag.endPosition && (Math.abs(this.drag.endPosition.top - this.drag.startPosition.top) > 1 || Math.abs(this.drag.endPosition.left - this.drag.startPosition.left) > 1)) return t.stopPropagation(), void t.stopImmediatePropagation(); if (this.drag.distance > (this.lockAxis ? 6 : 1)) return t.preventDefault(), t.stopPropagation(), void t.stopImmediatePropagation(); let e = null,
            i = null;
        void 0 !== t.clientX && void 0 !== t.clientY && (e = t.clientX - this.$content.getClientRects()[0].left, i = t.clientY - this.$content.getClientRects()[0].top); let s = this.options.doubleClick; if (!s && this.events.doubleClick && this.events.doubleClick.length && (s = !0), s) { if (!this.clickTimer) return this.lastClickEvent = t, void(this.clickTimer = setTimeout((() => { this.clickTimer = null, !1 !== this.trigger("click", t) && "toggleZoom" === this.option("click") && this.toggleZoom({ x: e, y: i }) }), this.option("clickDelay")));
            this.getDistance([t, this.lastClickEvent]) >= 6 || (clearTimeout(this.clickTimer), this.clickTimer = null, !1 !== this.trigger("doubleClick", t) && "toggleZoom" === this.option("doubleClick") && this.toggleZoom({ x: e, y: i })) } else { if (!1 === this.trigger("click", t)) return; "toggleZoom" === this.option("click") && this.toggleZoom({ x: e, y: i }) } }
    destroy() { "destroy" !== this.state && (this.state = "destroy", this.$viewport.classList.remove("not-selectable"), this.$content instanceof HTMLImageElement && !this.$content.complete && (this.$content.onload = null, this.$content.onerror = null), this.pendingAnimateUpdate && (cancelAnimationFrame(this.pendingAnimateUpdate), this.pendingAnimateUpdate = null), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.detachEvents(), this.pointers = [], this.resetValues(), this.$viewport = null, this.$content = null, this.options = {}, this.events = {}) } }
h.version = "4.0.0-alpha.4", h.Plugins = {};
const c = (t, e) => { let i = 0; return function(...s) { const n = (new Date).getTime(); if (!(n - i < e)) return i = n, t(...s) } };
class d { constructor(t) { this.$container = null, this.$prev = null, this.$next = null, this.carousel = t, this.onRefresh = this.onRefresh.bind(this) }
    option(t) { return this.carousel.option(`Navigation.${t}`) }
    createButton(t) { const e = document.createElement("button");
        e.setAttribute("title", this.carousel.localize(`{{${t.toUpperCase()}}}`)); const i = this.option("classNames.button") + " " + this.option(`classNames.${t}`); return e.classList.add(...i.split(" ")), e.setAttribute("tabindex", "0"), e.innerHTML = this.carousel.localize(this.option(`${t}Tpl`)), e.addEventListener("click", (e => { e.preventDefault(), e.stopPropagation(), this.carousel["slide" + ("next" === t ? "Next" : "Prev")]() })), e }
    build() { this.$container || (this.$container = document.createElement("div"), this.$container.classList.add(this.option("classNames.main")), this.carousel.$element.appendChild(this.$container)), this.$next || (this.$next = this.createButton("next"), this.$container.appendChild(this.$next)), this.$prev || (this.$prev = this.createButton("prev"), this.$container.appendChild(this.$prev)) }
    onRefresh() { const t = this.carousel.pages.length;
        t <= 1 || t > 1 && this.carousel.elemDimWidth < this.carousel.wrapDimWidth && !Number.isInteger(this.carousel.option("slidesPerPage")) ? this.cleanup() : (this.build(), this.$prev.removeAttribute("disabled"), this.$next.removeAttribute("disabled"), this.carousel.option("infiniteX", this.carousel.option("infinite")) || (this.carousel.page <= 0 && this.$prev.setAttribute("disabled", ""), this.carousel.page >= t - 1 && this.$next.setAttribute("disabled", ""))) }
    cleanup() { this.$prev && this.$prev.remove(), this.$prev = null, this.$next && this.$next.remove(), this.$next = null, this.$container && this.$container.remove(), this.$container = null }
    attach() { this.carousel.on("refresh change", this.onRefresh) }
    detach() { this.carousel.off("refresh change", this.onRefresh), this.cleanup() } }
d.defaults = { prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>', nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>', classNames: { main: "carousel__nav", button: "carousel__button", next: "is-next", prev: "is-prev" } };
class u { constructor(t) { this.nav = t, this.selectedIndex = null, this.onNavReady = this.onNavReady.bind(this), this.onNavClick = this.onNavClick.bind(this), this.onNavCreateSlide = this.onNavCreateSlide.bind(this), this.onTargetChange = this.onTargetChange.bind(this) }
    onNavReady() { this.onTargetChange(!0), this.nav.on("createSlide", this.onNavCreateSlide), this.nav.on("Panzoom.updateMetrics", this.onTargetChange), this.nav.Panzoom.on("click", this.onNavClick), this.sync.on("change", this.onTargetChange) }
    onNavCreateSlide(t, e) { e.index === this.selectedIndex && this.markSelectedSlide(e.index) }
    onNavClick(t, e) { const i = e.target.closest(".carousel__slide"); if (!i) return;
        e.preventDefault(); const s = parseInt(i.dataset.index, 10),
            n = this.sync.getPageforSlide(s);
        this.sync.page !== n && this.sync.slideTo(n, { friction: this.nav.option("Sync.friction") }), this.markSelectedSlide(s) }
    markSelectedSlide(t) { this.selectedIndex = t, [...this.nav.slides].filter((t => t.$el && t.$el.classList.remove("is-nav-selected"))); const e = this.nav.slides[t];
        e && e.$el && e.$el.classList.add("is-nav-selected") }
    onTargetChange(t) { const e = this.sync.pages[this.sync.page].indexes[0],
            i = this.nav.getPageforSlide(e);
        null !== i && (this.nav.slideTo(i, !0 === t ? { friction: 0 } : {}), this.markSelectedSlide(e)) }
    attach() { const e = this.nav.options.Sync;
        e && (t(e) && "object" == typeof e.with && (this.sync = e.with), this.sync && this.nav.on("ready", this.onNavReady)) }
    detach() { this.sync && (this.nav.off("ready", this.onNavReady), this.nav.off("createSlide", this.onNavCreate), this.nav.on("Panzoom.updateMetrics", this.onTargetChange), this.sync.off("change", this.onTargetChange)), this.nav.Panzoom.off("click", this.onNavClick), this.sync = null, this.selectedIndex = null } }
u.defaults = { friction: .92 };
const p = { Navigation: d, Dots: class { constructor(t) { this.carousel = t, this.$list = null, this.events = { change: this.onChange.bind(this), refresh: this.onRefresh.bind(this) } }
            buildList() { if (this.carousel.pages.length < 2) return; const t = document.createElement("ol"); return t.classList.add("carousel__dots"), t.addEventListener("click", (t => { if (!("page" in t.target.dataset)) return;
                    t.preventDefault(), t.stopPropagation(); const e = parseInt(t.target.dataset.page, 10),
                        i = this.carousel;
                    e !== i.page && (i.pages.length < 3 && i.option("infinite") ? i[0 == e ? "slidePrev" : "slideNext"]() : i.slideTo(e)) })), this.$list = t, this.carousel.$element.appendChild(t), this.carousel.$element.classList.add("has-dots"), t }
            removeList() { this.$list && (this.$list.parentNode.removeChild(this.$list), this.$list = null) }
            rebuildDots() { let t = this.$list; const e = !!t,
                    i = this.carousel.pages.length; if (i < 2) return void(e && this.removeList());
                e || (t = this.buildList()); const s = this.$list.children.length; if (s > i)
                    for (let t = i; t < s; t++) this.$list.removeChild(this.$list.lastChild);
                else { for (let t = s; t < i; t++) { const e = document.createElement("li");
                        e.classList.add("carousel__dot"), e.dataset.page = t, e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.setAttribute("title", this.carousel.localize("{{GOTO}}", [
                            ["%d", t + 1]
                        ])), e.addEventListener("keydown", (t => { const i = t.code; let s; "Enter" === i || "NumpadEnter" === i ? s = e : "ArrowRight" === i ? s = e.nextSibling : "ArrowLeft" === i && (s = e.previousSibling), s && s.click() })), this.$list.appendChild(e) }
                    this.setActiveDot() } }
            setActiveDot() { if (!this.$list) return;
                this.$list.childNodes.forEach((t => { t.classList.remove("is-selected") })); const t = this.$list.childNodes[this.carousel.page];
                t && t.classList.add("is-selected") }
            onChange() { this.setActiveDot() }
            onRefresh() { this.rebuildDots() }
            attach() { this.carousel.on(this.events) }
            detach() { this.removeList(), this.carousel.off(this.events), this.carousel = null } }, Sync: u },
    g = { slides: [], preload: 0, slidesPerPage: "auto", initialPage: 0, friction: .92, center: !0, infinite: !0, fill: !0, dragFree: !1, classNames: { viewport: "carousel__viewport", track: "carousel__track", slide: "carousel__slide", slideSelected: "is-selected" }, l10n: { NEXT: "Next slide", PREV: "Previous slide", GOTO: "Go to slide %d" } };
class m extends r { constructor(t, i = {}) { super(i = e(!0, {}, g, i)), this.state = "init", this.$element = t, t.Carousel = this, this.page = this.pageIndex = null, this.prevPage = this.prevPageIndex = null, this.slideNext = c(this.slideNext.bind(this), 250), this.slidePrev = c(this.slidePrev.bind(this), 250), this.attachPlugins(m.Plugins), this.trigger("init"), this.initLayout(), this.initSlides(), this.initPanzoom(), this.state = "ready", this.trigger("ready") }
    initLayout() { if (!(this.$element instanceof HTMLElement)) throw new Error("No root element provided"); const t = this.option("classNames");
        this.$viewport = this.option("viewport") || this.$element.querySelector("." + t.viewport), this.$viewport || (this.$viewport = document.createElement("div"), this.$viewport.classList.add(t.viewport), this.$viewport.append(...this.$element.childNodes), this.$element.appendChild(this.$viewport)), this.$track = this.option("track") || this.$element.querySelector("." + t.track), this.$track || (this.$track = document.createElement("div"), this.$track.classList.add(t.track), this.$track.append(...this.$viewport.childNodes), this.$viewport.appendChild(this.$track)) }
    initSlides() { this.slides = [];
        this.$viewport.querySelectorAll("." + this.option("classNames.slide")).forEach((t => { const e = { $el: t, isDom: !0 };
            this.slides.push(e), this.trigger("createSlide", e, this.slides.length) })), Array.isArray(this.options.slides) && (this.slides = e(!0, [...this.slides], this.options.slides)) }
    updatePage() { let t = this.page;
        null === t && (t = this.page = this.option("initialPage")), this.updateMetrics(); const e = this.pages;
        e[t] || (t = e.length ? e[e.length - 1].index : 0), this.slideTo(t, { friction: 0 }) }
    updateBounds() { let t = this.Panzoom; const e = this.option("infinite"),
            i = this.option("infiniteX", e),
            s = this.option("infiniteY", e);
        i && (t.boundX = null), s && (t.boundY = null), i || s || (t.boundX = { from: -1 * this.pages[this.pages.length - 1].left, to: -1 * this.pages[0].left }) }
    initPanzoom() { const t = e(!0, {}, { content: this.$track, click: !1, doubleClick: !1, wheel: !1, pinchToZoom: !1, lockAxis: "x", textSelection: () => this.option("textSelection", !1), panOnlyZoomed: () => this.option("panOnlyZoomed", this.elemDimWidth < this.wrapDimWidth), on: { "*": (t, ...e) => this.trigger(`Panzoom.${t}`, ...e), init: t => this.Panzoom = t, updateMetrics: () => { this.updatePage() }, updateBounds: () => { this.updateBounds() }, beforeTransform: this.onBeforeTransform.bind(this), afterAnimate: this.onAfterAnimate.bind(this), touchEnd: this.onTouchEnd.bind(this) } }, this.option("Panzoom"));
        new h(this.$viewport, t) }
    onBeforeTransform() { this.option("infiniteX", this.option("infinite")) && this.manageInfiniteTrack(), this.manageSlideVisiblity() }
    onAfterAnimate(t, e) { e || this.trigger("settle") }
    onTouchEnd(t) { const e = this.option("dragFree"); if (!e && this.pages.length > 1 && t.drag.elapsedTime < 350 && Math.abs(t.drag.distanceY) < 1 && Math.abs(t.drag.distanceX) > 5) this[t.drag.distanceX < 0 ? "slideNext" : "slidePrev"]();
        else if (e) { const [, t] = this.getPageFromPosition(-1 * this.Panzoom.pan.x);
            this.setPage(t) } else this.slideToClosest() }
    manageInfiniteTrack() { if (!this.option("infiniteX", this.option("infinite")) || this.pages.length < 2 || this.elemDimWidth < this.wrapDimWidth) return; const t = this.Panzoom; let e = !1; return t.current.x < -1 * (t.contentDim.width - t.viewportDim.width) && (t.current.x += t.contentDim.width, t.drag.firstPosition && (t.drag.firstPosition.x += t.contentDim.width), this.pageIndex = this.pageIndex - this.pages.length, e = !0), t.current.x > t.viewportDim.width && (t.current.x -= t.contentDim.width, t.drag.firstPosition && (t.drag.firstPosition.x -= t.contentDim.width), this.pageIndex = this.pageIndex + this.pages.length, e = !0), e && "dragging" === t.state && t.resetDragState(), e }
    manageSlideVisiblity() { const t = this.elemDimWidth,
            e = this.wrapDimWidth; let i = -1 * this.Panzoom.current.x;
        Math.abs(i) < .1 && (i = 0); const s = this.option("preload"),
            n = this.option("infiniteX", this.option("infinite")),
            o = parseFloat(window.getComputedStyle(this.$viewport, null).getPropertyValue("padding-left")),
            a = parseFloat(window.getComputedStyle(this.$viewport, null).getPropertyValue("padding-right"));
        this.slides.forEach((r => { let l, h, c = 0;
            l = i - o, h = i + e + a, l -= s * (e + o + a), h += s * (e + o + a); const d = r.left + r.width > l && r.left < h;
            l = i + t - o, h = i + t + e + a, l -= s * (e + o + a); const u = n && r.left + r.width > l && r.left < h;
            l = i - t - o, h = i - t + e + a, l -= s * (e + o + a); const p = n && r.left + r.width > l && r.left < h;
            u || d || p ? (this.createSlideEl(r), d && (c = 0), u && (c = -1), p && (c = 1), r.left + r.width > i && r.left <= i + e + a && (c = 0)) : this.removeSlideEl(r), r.hasDiff = c })); let r = 0,
            l = 0;
        this.slides.forEach(((e, i) => { let s = 0;
            e.$el ? (i !== r || e.hasDiff ? s = l + e.hasDiff * t : l = 0, e.$el.style.left = Math.abs(s) > .1 ? `${l+e.hasDiff*t}px` : "", r++) : l += e.width })), this.Panzoom.viewportDim.height = this.Panzoom.$content.clientHeight, this.markSelectedSlides() }
    markSelectedSlides() { const t = this.option("classNames.slideSelected"),
            e = "aria-hidden";
        this.slides.forEach(((i, s) => { const n = i.$el; if (!n) return; const o = this.pages[this.page];
            o && o.indexes && o.indexes.indexOf(s) > -1 ? (t && !n.classList.contains(t) && (n.classList.add(t), this.trigger("selectSlide", i)), n.removeAttribute(e)) : (t && n.classList.contains(t) && (n.classList.remove(t), this.trigger("unselectSlide", i)), n.setAttribute(e, !0)) })) }
    createSlideEl(t) { if (!t) return; if (t.$el) { if (parseInt(t.$el.dataset.index, 10) !== t.index) { t.$el.dataset.index = t.index; let e;
                t.$el.querySelectorAll("[data-lazy-src]").forEach((t => { let e = t.dataset.lazySrc;
                    t instanceof HTMLImageElement ? t.src = e : t.style.backgroundImage = `url('${e}')` })), (e = t.$el.dataset.lazySrc) && (t.$el.style.backgroundImage = `url('${e}')`), t.state = "ready" } return } const e = document.createElement("div");
        e.dataset.index = t.index, e.classList.add(this.option("classNames.slide")), t.customClass && e.classList.add(...t.customClass.split(" ")), t.html && (e.innerHTML = t.html); const i = [];
        this.slides.forEach(((t, e) => { t.$el && i.push(e) })); const s = t.index; let n = null; if (i.length) { let t = i.reduce(((t, e) => Math.abs(e - s) < Math.abs(t - s) ? e : t));
            n = this.slides[t] } return this.$track.insertBefore(e, n && n.$el ? n.index < t.index ? n.$el.nextSibling : n.$el : null), t.$el = e, this.trigger("createSlide", t, s), t }
    getSlideMetrics(t) { if (!t) { const e = this.slides[0];
            (t = document.createElement("div")).dataset.isTestEl = 1, t.style.visibility = "hidden", t.classList.add(this.option("classNames.slide")), e.customClass && t.classList.add(...e.customClass.split(" ")), this.$track.prepend(t) } let e = i(t.getBoundingClientRect().width); const s = t.currentStyle || window.getComputedStyle(t); return e = e + (parseFloat(s.marginLeft) || 0) + (parseFloat(s.marginRight) || 0), window.visualViewport && (e *= window.visualViewport.scale), t.dataset.isTestEl && t.remove(), e }
    updateMetrics() { let t, e = 0,
            s = [];
        this.slides.forEach(((i, n) => { const o = i.$el,
                a = i.isDom || !t ? this.getSlideMetrics(o) : t;
            i.index = n, i.width = a, i.left = e, t = a, e += a, s.push(n) })), this.elemDimWidth = i(e), this.Panzoom.contentDim.width = this.elemDimWidth, this.wrapDimWidth = i(this.$viewport.getBoundingClientRect().width); var n = window.getComputedStyle(this.$viewport),
            o = parseFloat(n.paddingLeft) + parseFloat(n.paddingRight);
        this.wrapDimWidth = this.wrapDimWidth - o, window.visualViewport && (this.wrapDimWidth *= window.visualViewport.scale), this.Panzoom.viewportDim.width = this.wrapDimWidth; const a = [],
            r = this.option("slidesPerPage"); if (Number.isInteger(r) && this.elemDimWidth > this.wrapDimWidth)
            for (let t = 0; t < this.slides.length; t += r) a.push({ indexes: s.slice(t, t + r), slides: this.slides.slice(t, t + r) });
        else { let t = 0,
                e = 0; for (let i = 0; i < this.slides.length; i += 1) { let s = this.slides[i];
                (!a.length || e + s.width > this.wrapDimWidth) && (a.push({ indexes: [], slides: [] }), t = a.length - 1, e = 0), e += s.width, a[t].indexes.push(i), a[t].slides.push(s) } } const l = this.option("center"),
            h = this.option("fill");
        a.forEach(((t, e) => { t.index = e, t.width = t.slides.reduce(((t, e) => t + e.width), 0), t.left = t.slides[0].left, l && (t.left += .5 * (this.wrapDimWidth - t.width) * -1), h && !this.option("infiniteX", this.option("infinite")) && this.elemDimWidth > this.wrapDimWidth && (t.left = Math.max(t.left, 0), t.left = Math.min(t.left, this.elemDimWidth - this.wrapDimWidth)) })); const c = []; let d;
        a.forEach((t => { d && t.left === d.left ? (d.width += t.width, d.slides = [...d.slides, ...t.slides], d.indexes = [...d.indexes, ...t.indexes]) : (t.index = c.length, d = t, c.push(t)) })), this.pages = c, this.manageSlideVisiblity(), this.trigger("refresh") }
    setPage(t, e) { let i = 0,
            s = parseInt(t, 10) || 0; const n = this.page,
            o = this.pageIndex,
            a = this.pages.length; if (t = (s % a + a) % a, this.option("infiniteX", this.option("infinite")) && this.elemDimWidth > this.wrapDimWidth) { const n = Math.floor(s / a) || 0,
                o = this.elemDimWidth; if (i = this.pages[t].left + n * o, !0 === e && a > 2) { let t = -1 * this.Panzoom.current.x; const e = i - o,
                    n = i + o,
                    r = Math.abs(t - i),
                    l = Math.abs(t - e),
                    h = Math.abs(t - n);
                h < r && h <= l ? (i = n, s += a) : l < r && l < h && (i = e, s -= a) } } else t = s = Math.max(0, Math.min(s, a - 1)), i = this.pages[t].left; return this.page = t, this.pageIndex = s, null !== n && t !== n && (this.prevPage = n, this.prevPageIndex = o, this.trigger("change", t, n)), i }
    slideTo(t, e = {}) { const { friction: i = this.option("friction") } = e;
        this.Panzoom.panTo({ x: -1 * this.setPage(t, !0), y: 0, friction: i }) }
    slideToClosest(t = {}) { let [, e] = this.getPageFromPosition(-1 * this.Panzoom.pan.x);
        this.slideTo(e, t) }
    slideNext() { this.slideTo(this.pageIndex + 1) }
    slidePrev() { this.slideTo(this.pageIndex - 1) }
    getPageforSlide(t) { const e = this.pages.find((e => e.indexes.indexOf(t) > -1)); return e ? e.index : null }
    getPageFromPosition(t) { const e = this.pages.length;
        this.option("center") && (t += .5 * this.wrapDimWidth); const i = Math.floor(t / this.elemDimWidth);
        t -= i * this.elemDimWidth; let s = this.slides.find((e => e.left < t && e.left + e.width > t)); if (s) { let t = this.getPageforSlide(s.index); return [t, t + i * e] } return [0, 0] }
    removeSlideEl(t) { t.$el && !t.isDom && (this.trigger("deleteSlide", t), t.$el.remove(), t.$el = null) }
    destroy() { this.state = "destroy", this.slides.forEach((t => { this.removeSlideEl(t) })), this.Panzoom.destroy(), this.options = {}, this.events = {} } }
m.version = "4.0.0-alpha.4", m.Plugins = p;
const f = !("undefined" == typeof window || !window.document || !window.document.createElement);
class v { constructor(t) { this.fancybox = t, this.$wrap = null, this.state = "init"; for (const t of["onReady", "onClosing", "onKeydown"]) this[t] = this[t].bind(this);
        this.events = { ready: this.onReady, closing: this.onClosing, keydown: this.onKeydown } }
    onReady() {!0 === this.fancybox.option("Thumbs.autoStart") && this.initLayout() }
    onClosing() { this.Carousel && this.Carousel.Panzoom.detachEvents() }
    onKeydown(t, e) { e === t.option("Thumbs.key") && this.toggle() }
    initLayout() { if ("init" !== this.state) return; const t = this.getSlides(); if (t.length < this.fancybox.option("Thumbs.minSlideCount")) return !1; const i = document.createElement("div");
        i.classList.add("fancybox__thumbs"), this.fancybox.$container.appendChild(i), this.Carousel = new m(i, e(!0, { Dots: !1, Navigation: !1, Sync: { friction: 0 }, infinite: !1, center: !0, fill: !0, dragFree: !0, slidesPerPage: 1, preload: 1 }, this.fancybox.option("Thumbs.Carousel"), { Sync: { with: this.fancybox.Carousel }, slides: t })), this.Carousel.Panzoom.on("wheel", ((t, e) => { e.preventDefault(), this.fancybox[e.deltaY < 0 ? "prev" : "next"]() })), this.$wrap = i, this.state = "ready" }
    getSlides() { const t = []; return this.fancybox.items.forEach((e => { const i = e.thumb;
            i && t.push({ html: `<div class="fancybox__thumb" style="background-image:url(${i})"></div>`, customClass: `has-thumb has-${e.type||"image"}` }) })), t }
    toggle() { return "ready" === this.state ? (this.Carousel.Panzoom.detachEvents(), this.$wrap.style.display = "none", void(this.state = "hidden")) : "hidden" === this.state ? (this.$wrap.style.display = "", this.Carousel.Panzoom.attachEvents(), void(this.state = "ready")) : void this.initLayout() }
    cleanup() { this.Carousel && (this.Carousel.destroy(), this.Carousel = null), this.$wrap && (this.$wrap.remove(), this.$wrap = null), this.state = "init" }
    attach() { this.fancybox.on(this.events) }
    detach() { this.fancybox.off(this.events), this.cleanup() } }
v.defaults = { autoStart: !0, minSlideCount: 3, key: "t" };
const y = t => Object.entries(t).map((t => t.map(encodeURIComponent).join("="))).join("&"),
    b = { video: { autoplay: !0, ratio: 16 / 9 }, youtube: { autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 }, vimeo: { hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1 }, html5video: { tpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />\n  Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!\n</video>', format: "" } };
class x { constructor(t) { this.fancybox = t; for (const t of["onPrepare", "onCreateSlide", "onDeleteSlide", "onSelectSlide", "onUnselectSlide", "onRefresh", "onMessage"]) this[t] = this[t].bind(this);
        this.events = { init: this.onPrepare, "Carousel.createSlide": this.onCreateSlide, "Carousel.deleteSlide": this.onDeleteSlide, "Carousel.selectSlide": this.onSelectSlide, "Carousel.unselectSlide": this.onUnselectSlide, "Carousel.refresh": this.onRefresh } }
    onPrepare() { this.fancybox.items.forEach((t => { this.processType(t) })) }
    processType(t) { if (t.html) return t.src = t.html, t.type = "html", void delete t.html; const i = t.src || ""; let s = t.type || this.fancybox.options.type,
            n = null; if (!i || "string" == typeof i) { if (n = i.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) { const e = y(this.fancybox.option("Html.youtube")),
                    i = encodeURIComponent(n[1]);
                t.videoId = i, t.src = `https://www.youtube-nocookie.com/embed/${i}?${e}`, t.thumb = t.thumb || `https://i.ytimg.com/vi/${i}/mqdefault.jpg`, t.vendor = "youtube", s = "video" } else if (n = i.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/)) { const e = y(this.fancybox.option("Html.vimeo")),
                    i = encodeURIComponent(n[1]);
                t.videoId = i, t.src = `https://player.vimeo.com/video/${i}?${e}`, t.vendor = "vimeo", s = "video" } else(n = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `//maps.google.${n[1]}/?ll=${(n[2]?n[2]+"&z="+Math.floor(n[3])+(n[4]?n[4].replace(/^\//,"&"):""):n[4]+"").replace(/\?/,"&")}&output=${n[4]&&n[4].indexOf("layer=c")>0?"svembed":"embed"}`, s = "map") : (n = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `//maps.google.${n[1]}/maps?q=${n[2].replace("query=","q=").replace("api=1","")}&output=embed`, s = "map");
            s || ("#" === i.charAt(0) ? s = "inline" : (n = i.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (s = "html5video", t.format = t.format || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : i.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : i.match(/\.(pdf)((\?|#).*)?$/i) && (s = "pdf")), t.type = s || this.fancybox.option("defaultType", "image"), "html5video" !== s && "video" !== s || (t.video = e({}, this.fancybox.option("Html.video"), t.video), t.width && t.height ? t.ratio = parseFloat(t.width) / parseFloat(t.height) : t.ratio = t.ratio || t.video.ratio) } }
    loadInlineContent(t) { let e; if (t.src instanceof HTMLElement) e = t.src;
        else if ("string" == typeof t.src) { const i = t.src.split("#", 2),
                s = 2 === i.length && "" === i[0] ? i[1] : i[0];
            e = document.getElementById(s) } if (e) { if ("clone" === t.type || e.$placeHolder) { e = e.cloneNode(!0); let i = e.getAttribute("id");
                i = i ? `${i}--clone` : `clone-${this.fancybox.id}-${t.index}`, e.setAttribute("id", i) } else { const t = document.createElement("div");
                t.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(t, e), e.$placeHolder = t }
            this.fancybox.setContent(t, e) } else this.fancybox.setError(t, "{{ELEMENT_NOT_FOUND}}") }
    loadAjaxContent(t) { const e = this.fancybox,
            i = new XMLHttpRequest;
        e.showLoading(t), i.onreadystatechange = function() { i.readyState === XMLHttpRequest.DONE && "ready" === e.state && (e.hideLoading(t), 200 === i.status ? e.setContent(t, i.responseText) : e.setError(t, 404 === i.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}")) }, i.open("GET", t.src), i.send(t.ajax || null), t.xhr = i }
    loadIframeContent(t) { const e = this.fancybox,
            i = document.createElement("iframe"); if (i.className = "fancybox__iframe", i.setAttribute("id", `fancybox__iframe_${e.id}_${t.index}`), i.setAttribute("allow", "autoplay; fullscreen"), i.setAttribute("scrolling", "auto"), t.$iframe = i, "iframe" !== t.type || !1 === t.preload) return i.setAttribute("src", t.src), void this.fancybox.setContent(t, i);
        e.showLoading(t); const s = document.createElement("div");
        s.style.visibility = "hidden", this.fancybox.setContent(t, s), s.appendChild(i), i.onerror = () => { e.setError(t, "{{IFRAME_ERROR}}") }, i.onload = () => { e.hideLoading(t); let s = !1; "yes" !== i.dataset.ready && (i.dataset.ready = "yes", s = !0), i.src.length && (i.parentNode.style.visibility = "", !1 !== t.autoSize && this.autoSizeIframe(i), s && e.revealContent(t)) }, i.setAttribute("src", t.src) }
    setAspectRatio(t) { let e = t.ratio; if (!e || !t.$content) return;
        t.$content.style.maxWidth = "", t.$content.style.maxHeight = ""; let i = t.$content.offsetWidth,
            s = t.$content.offsetHeight,
            n = t.width,
            o = t.height; if (n && o && (i > n || s > o)) { let t = Math.min(n / i, o / s);
            i *= t, s *= t }
        e < i / s ? i = s * e : s = i / e, t.$content.style.maxWidth = `${i}px`, t.$content.style.maxHeight = `${s}px` }
    autoSizeIframe(t) { if (!t.dataset || "yes" !== t.dataset.ready) return; let e = t.parentNode.style;
        e.flex = "1 1 auto", e.width = "", e.height = ""; try { const i = t.contentWindow.document,
                s = i.getElementsByTagName("html")[0],
                n = i.body,
                o = window.getComputedStyle(t.parentNode),
                a = parseFloat(o.paddingLeft) + parseFloat(o.paddingRight),
                r = parseFloat(o.paddingTop) + parseFloat(o.paddingBottom);
            n.style.overflow = "hidden"; const l = s.scrollWidth;
            e.width = `${l+a}px`, n.style.overflow = "", e.flex = "", e.flexShrink = "0", e.height = `${n.scrollHeight}px`; const h = s.scrollHeight;
            e.height = `${h+r}px` } catch (t) { e = "" } }
    onRefresh(t, e) { e.slides.forEach((t => { t.$el && (t.$iframe && !1 !== t.autoSize && this.autoSizeIframe(t.$iframe), t.ratio && this.setAspectRatio(t)) })) }
    onCreateSlide(t, e, i) { if (i && !i.isDom) { switch (i.type) {
                case "html":
                    this.fancybox.setContent(i, i.src); break;
                case "html5video":
                    this.fancybox.setContent(i, this.fancybox.option("Html.html5video.tpl").replace(/\{\{src\}\}/gi, i.src).replace("{{format}}", i.format || i.html5video && i.html5video.format || "").replace("{{poster}}", i.thumb || "")); break;
                case "inline":
                case "clone":
                    this.loadInlineContent(i); break;
                case "ajax":
                    this.loadAjaxContent(i); break;
                case "iframe":
                case "pdf":
                case "video":
                case "map":
                    this.loadIframeContent(i) }
            i.ratio && this.setAspectRatio(i) } }
    onSelectSlide(t, e, i) { if ("html5video" === i.type && i.$el.querySelector("video").play(), "video" !== i.type || !i.$iframe || !i.$iframe.contentWindow) return; const s = () => { if ("done" !== i.state || !i.$iframe.contentWindow) return; let t; if (i.$iframe.isReady) return i.video && i.video.autoplay && (t = "youtube" == i.vendor ? { event: "command", func: "playVideo" } : { method: "play", value: "true" }), void(t && i.$iframe.contentWindow.postMessage(JSON.stringify(t), "*")); "youtube" === i.vendor && (t = { event: "listening", id: i.$iframe.getAttribute("id") }, i.$iframe.contentWindow.postMessage(JSON.stringify(t), "*")), i.poller = setTimeout(s, 250) };
        s() }
    onUnselectSlide(t, e, i) { if ("html5video" === i.type) { try { i.$el.querySelector("video").pause() } catch (t) {} return } let s = !1; "vimeo" == i.vendor ? s = { method: "pause", value: "true" } : "youtube" === i.vendor && (s = { event: "command", func: "pauseVideo" }), s && i.$iframe && i.$iframe.contentWindow && i.$iframe.contentWindow.postMessage(JSON.stringify(s), "*"), clearTimeout(i.poller) }
    onDeleteSlide(t, e, i) { i.xhr && (i.xhr.abort(), i.xhr = null), i.$iframe && (i.$iframe.onload = i.$iframe.onerror = null, i.$iframe.src = "//about:blank", i.$iframe = null); const s = i.$content; "inline" === i.type && s && (s.classList.remove("fancybox__content"), "none" !== s.style.display && (s.style.display = "none"), i.$closeButton && (i.$closeButton.remove(), i.$closeButton = null)); const n = s && s.$placeHolder;
        n && (n.parentNode.insertBefore(s, n), n.remove(), s.$placeHolder = null) }
    onMessage(t) { try { let e = JSON.parse(t.data); if ("https://player.vimeo.com" === t.origin) { if ("ready" === e.event)
                    for (let e of document.getElementsByClassName("fancybox__iframe")) e.contentWindow === t.source && (e.isReady = 1) } else "https://www.youtube-nocookie.com" === t.origin && "onReady" === e.event && (document.getElementById(e.id).isReady = 1) } catch (t) {} }
    attach() { this.fancybox.on(this.events), window.addEventListener("message", this.onMessage, !1) }
    detach() { this.fancybox.off(this.events), window.removeEventListener("message", this.onMessage, !1) } }
x.defaults = b;
const w = function(t) { const e = t.naturalWidth,
        i = t.naturalHeight,
        s = t.width,
        n = t.height,
        o = e / i,
        a = { width: s, height: n }; return o > s / n ? a.height = s / o : a.width = n * o, a.left = .5 * (s - a.width), a.right = e + a.left, a };
class $ { constructor(t) { this.fancybox = t; for (const t of["onReady", "onClosing", "onPageChange", "onCreateSlide", "onRemoveSlide", "onRefresh", "onImageStatusChange"]) this[t] = this[t].bind(this);
        this.events = { ready: this.onReady, closing: this.onClosing, "Carousel.change": this.onPageChange, "Carousel.createSlide": this.onCreateSlide, "Carousel.deleteSlide": this.onRemoveSlide, "Carousel.Panzoom.updateMetrics": this.onRefresh } }
    onReady() { const t = this.fancybox.getSlide(); "ready" === t.state && this.revealContent(t) }
    onCreateSlide(t, e, i) { if (i.isDom || i.html || i.type && "image" !== i.type) return;
        i.type = "image", i.state = "loading"; const s = document.createElement("div");
        s.style.visibility = "hidden"; const n = document.createElement("img");
        n.onload = () => this.onImageStatusChange(i), n.onerror = () => this.onImageStatusChange(i), n.src = i.src, n.alt = "", n.draggable = !1, n.classList.add("fancybox__image"), i.srcset && n.setAttribute("srcset", i.srcset), i.sizes && n.setAttribute("sizes", i.sizes), i.$image = n, s.appendChild(n), i.$el.dataset.imageFit = this.fancybox.option("Image.fit"), i.$el.style.display = "none", i.$el.offsetHeight, i.$el.style.display = "", this.fancybox.setContent(i, s), n.complete || n.error ? (n.onload = n.onerror = null, this.onImageStatusChange(i)) : n.complete || this.fancybox.showLoading(i) }
    initSlidePanzoom(t) { t.Panzoom || (t.Panzoom = new h(t.$el, e(!0, this.fancybox.option("Image.Panzoom"), { content: t.$image, panOnlyZoomed: !0, click: null, doubleClick: null, wheel: null, on: { afterAnimate: e => { "zoomIn" === t.state && (e.attachEvents(), this.fancybox.done(t)), this.handleCursor(t) }, updateMetrics: () => { this.handleCursor(t) }, touchMove: () => { if (this.fancybox.Carousel.Panzoom.lockAxis) return !1 } } })), this.fancybox.option("Image.wheel") && t.Panzoom.on("wheel", ((t, e) => this.onWheel(t, e))), this.fancybox.option("Image.click") && t.Panzoom.on("click", ((t, e) => this.onClick(t, e))), "toggleZoom" === this.fancybox.option("Image.doubleClick") && t.Panzoom.on("doubleClick", ((t, e) => { if (!e.target.closest(".fancybox__content")) return;
            e.preventDefault(), e.stopPropagation(); const i = e.clientX - t.$content.getClientRects()[0].left,
                s = e.clientY - t.$content.getClientRects()[0].top;
            t.toggleZoom({ x: i, y: s }) }))) }
    onImageStatusChange(t) { this.fancybox.hideLoading(t); const e = t.$image;
        e.complete && e.width && e.height ? (t.state = "ready", this.updateDimensions(t), this.initSlidePanzoom(t), this.revealContent(t)) : this.fancybox.setError(t, "{{IMAGE_ERROR}}") }
    updateDimensions(t) { if ("cover" !== t.$el.dataset.imageFit) { const e = t.$image,
                i = t.$content;
            i.style.maxWidth = ""; const s = e.offsetWidth - e.clientWidth;
            i.style.maxWidth = `${w(e).width+s}px` }
        this.handleCursor(t) }
    revealContent(t) { this.updateDimensions(t), null === this.fancybox.Carousel.prevPage && t.index === this.fancybox.options.startIndex && this.canZoom(t) ? this.zoomIn() : this.fancybox.revealContent(t) }
    canZoom(t) { const e = this.fancybox,
            i = e.$container; let s = !1; if (!e.option("Image.zoom")) return s; const n = t.$thumb; if (!n || "loading" === t.state) return s;
        i.style.pointerEvents = "none"; const o = n.getBoundingClientRect(); if (this.fancybox.option("Image.ignoreCoveredThumbnail")) { const t = document.elementFromPoint(o.left + 1, o.top + 1) === n,
                e = document.elementFromPoint(o.right - 1, o.bottom - 1) === n;
            s = t && e } else s = document.elementFromPoint(o.left + .5 * o.width, o.top + .5 * o.height) === n; return i.style.pointerEvents = "", s }
    getZoomInfo(t) { const e = t.$thumb.getBoundingClientRect(),
            i = e.width,
            s = e.height,
            n = t.$content.getBoundingClientRect(),
            o = w(t.$image),
            a = o.width,
            r = o.height,
            l = n.top + .5 * r - (e.top + .5 * s),
            h = n.left + .5 * a - (e.left + .5 * i); let c = this.fancybox.option("Image.zoomOpacity"); return "auto" === c && (c = Math.abs(i / s - a / r) > .1), { top: l, left: h, scale: e.width / a, opacity: c } }
    zoomIn() { const t = this.fancybox; if ("init" === t.Carousel.state) return; const e = t.getSlide(),
            i = e.Panzoom,
            { top: s, left: n, scale: o, opacity: a } = this.getZoomInfo(e);
        e.state = "zoomIn", i.detachEvents(), t.trigger("reveal", e), i.panTo({ x: -1 * n, y: -1 * s, scale: o, friction: 0, ignoreBounds: !0 }), e.$content.style.visibility = "", !0 === a && i.on("afterTransform", (t => { "zoomIn" !== e.state && "zoomOut" !== e.state || (t.$content.style.opacity = Math.min(1, t.current.scale)) })), i.panTo({ x: 0, y: 0, scale: 1, friction: this.fancybox.option("Image.zoomFriction") }) }
    zoomOut() { const t = this.fancybox,
            e = t.getSlide(),
            i = e.Panzoom; if (!i) return;
        e.state = "zoomOut", t.state = "customClosing", e.$caption && (e.$caption.style.visibility = "hidden"); let s = .75 * this.fancybox.option("Image.zoomFriction"); const n = () => { const { top: t, left: n, scale: o } = this.getZoomInfo(e);
            i.panTo({ x: -1 * n, y: -1 * t, scale: o, ignoreBounds: !0, friction: s }), s *= .98 };
        window.addEventListener("scroll", n), i.on("afterAnimate", (() => { window.removeEventListener("scroll", n), t.destroy() })), n() }
    handleCursor(t) { const e = t.Panzoom,
            i = this.fancybox.option("Image.click"),
            s = t.$el.classList; if (e && "toggleZoom" === i) { s[e && 1 === e.current.scale && e.option("maxScale") - e.current.scale > .01 ? "add" : "remove"](this.fancybox.option("Image.canZoomInClass")) } else "close" === i && s.add(this.fancybox.option("Image.canZoomOutClass")) }
    onWheel(t, e) { switch (this.fancybox.option("Image.wheel")) {
            case "zoom":
                t.zoomWithWheel(e); break;
            case "close":
                this.fancybox.close(); break;
            case "slide":
                this.fancybox[e.deltaY < 0 ? "prev" : "next"]() }
        e.preventDefault() }
    onClick(t, e) { if (!(this.fancybox.Carousel.Panzoom.drag.distance >= 6 || this.fancybox.Carousel.Panzoom.lockAxis || "IMG" != e.target.tagName && !e.target.classList.contains("fancybox__content"))) switch (e.preventDefault(), e.stopPropagation(), this.fancybox.option("Image.click")) {
            case "toggleZoom":
                const i = e.clientX - t.$content.getClientRects()[0].left,
                    s = e.clientY - t.$content.getClientRects()[0].top;
                t.toggleZoom({ x: i, y: s }); break;
            case "close":
                this.fancybox.close(); break;
            case "next":
                this.fancybox.next(); break;
            case "prev":
                this.fancybox.prev() } }
    onRefresh(t, e) { e.slides.forEach((t => { t.Panzoom && this.updateDimensions(t) })) }
    onRemoveSlide(t, e, i) { i.$image && (i.$el.classList.remove(t.option("Image.canZoomInClass")), i.$image.onload = i.$image.onerror = null, i.$image.remove(), i.$image = null), i.Panzoom && (i.Panzoom.destroy(), i.Panzoom = null), delete i.$el.dataset.imageFit }
    onClosing(t) { t.Carousel.slides.forEach((t => { t.$image && (t.$image.onload = t.$image.onerror = null), t.Panzoom && t.Panzoom.detachEvents() })), "closing" === this.fancybox.state && this.canZoom(t.getSlide()) && this.zoomOut() }
    onPageChange(t, e) { const i = t.getSlide();
        e.slides.forEach((t => { t.Panzoom && "done" === t.state && (t.index !== i.index ? t.Panzoom.panTo({ x: 0, y: 0, scale: 1, friction: .8 }) : 0 === e.Panzoom.velocity.x && this.revealContent(t)) })) }
    attach() { this.fancybox.on(this.events) }
    detach() { this.fancybox.off(this.events) } }
$.defaults = { Panzoom: { maxScale: 1 }, canZoomInClass: "can-zoom_in", canZoomOutClass: "can-zoom_out", zoom: !0, zoomOpacity: "auto", zoomFriction: .8, ignoreCoveredThumbnail: !1, click: "toggleZoom", doubleClick: null, wheel: "zoom", fit: "contain" };
const C = function() { const t = window.location.hash.substr(1),
        e = t.split("-"),
        i = e.length > 1 && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10) || null; return { hash: t, slug: e.join("-"), index: i } };
class P { constructor(t) { this.fancybox = t, this.events = { closing: this.onClosing.bind(this), "Carousel.ready Carousel.change": this.onChange.bind(this) }, this.hasCreatedHistory = !1, this.origHash = "", this.timer = null }
    onChange(t, e) { this.timer && clearTimeout(this.timer); const i = null === e.prevPage,
            s = t.getSlide(),
            n = s.$trigger && s.$trigger.dataset,
            o = window.location.hash.substr(1); let a = !1; if (s.slug) a = s.slug;
        else { let t = n && n.fancybox;
            t && t.length && "true" !== t && (a = t + (e.slides.length > 1 ? "-" + (s.index + 1) : "")) }
        i && (this.origHash = o !== a ? this.origHash : ""), a && o !== a && (this.timer = setTimeout((() => { try { window.history[i ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + a), i && (this.hasCreatedHistory = !0) } catch (t) {} }), 300)) }
    onClosing() { if (this.timer && clearTimeout(this.timer), !0 !== this.hasSilentClose) { if (!this.hasCreatedHistory) try { return void window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash ? "#" + this.origHash : "")) } catch (t) {}
            window.history.back() } }
    attach(t) { t.on(this.events) }
    detach(t) { t.off(this.events) }
    static startFromUrl() { if (P.Fancybox.getInstance()) return; const { hash: t, slug: e, index: i } = C(); if (!e) return; let s = document.querySelector(`[data-slug="${t}"]`); if (s && s.dispatchEvent(new CustomEvent("click", { bubbles: !0, cancelable: !0 })), P.Fancybox.getInstance()) return; const n = document.querySelectorAll(`[data-fancybox="${e}"]`);
        n.length && (null === i && 1 === n.length ? s = n[0] : i && (s = n[i - 1]), s && s.dispatchEvent(new CustomEvent("click", { bubbles: !0, cancelable: !0 }))) }
    static onHashChange() { const { slug: t, index: e } = C(), i = P.Fancybox.getInstance(); if (i) { if (t) { const s = i.Carousel; for (let e of s.slides)
                    if (e.slug && e.slug === t) return s.slideTo(e.index);
                const n = i.getSlide(),
                    o = n.$trigger && n.$trigger.dataset; if (o && o.fancybox === t) return s.slideTo(e - 1) }
            i.plugins.Hash.hasSilentClose = !0, i.close() }
        P.startFromUrl() }
    static onReady() { window.addEventListener("hashchange", P.onHashChange, !1), P.startFromUrl() }
    static create() { f && window.requestAnimationFrame((() => { P.onReady() })) }
    static destroy() { window.removeEventListener("hashchange", P.onHashChange, !1) } }
const S = { ScrollLock: class { constructor(t) { this.fancybox = t, this.viewport = null, this.pendingUpdate = null; for (const t of["onReady", "onResize", "onTouchstart", "onTouchmove"]) this[t] = this[t].bind(this) }
        onReady() { const t = window.visualViewport;
            t && (this.viewport = t, this.startY = 0, t.addEventListener("resize", this.onResize), this.updateViewport()), window.addEventListener("touchstart", this.onTouchstart, { passive: !1 }), window.addEventListener("touchmove", this.onTouchmove, { passive: !1 }) }
        onResize() { this.updateViewport() }
        updateViewport() { const t = this.fancybox,
                e = this.viewport,
                i = e.scale,
                s = t.$container; if (!s) return; let n = "",
                o = "",
                a = "";
            Math.abs(i - 1) > .1 && (n = e.width * i + "px", o = e.height * i + "px", a = `translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0) scale(${1/i})`), s.style.width = n, s.style.height = o, s.style.transform = a }
        onTouchstart(t) { this.startY = t.touches ? t.touches[0].screenY : t.screenY }
        onTouchmove(t) { const e = this.startY,
                i = window.innerWidth / window.document.documentElement.clientWidth; if (t.touches.length > 1 || 1 !== i) return; const s = t.target,
                o = n(s); if (!o) return void t.preventDefault(); const a = window.getComputedStyle(o),
                r = parseInt(a.getPropertyValue("height"), 10),
                l = t.touches ? t.touches[0].screenY : t.screenY,
                h = e <= l && 0 === o.scrollTop,
                c = e >= l && o.scrollHeight - o.scrollTop === r;
            (h || c) && t.preventDefault() }
        cleanup() { this.pendingUpdate && (cancelAnimationFrame(this.pendingUpdate), this.pendingUpdate = null); const t = this.viewport;
            t && (t.removeEventListener("resize", this.onResize), this.viewport = null), window.removeEventListener("touchstart", this.onTouchstart, !1), window.removeEventListener("touchmove", this.onTouchmove, !1) }
        attach() { this.fancybox.on("initLayout", this.onReady) }
        detach() { this.fancybox.off("initLayout", this.onReady), this.cleanup() } }, Thumbs: v, Html: x, Image: $, Hash: P };
let E = 0,
    L = null;
class T extends r { constructor(t, i = {}) { L = function() { let t = !1; return document.createElement("div").focus({get preventScroll() { return t = !0, !1 } }), t }(), super(function(t, i) { const s = e(!0, {}, t[i.startIndex] || {}); return t.forEach((t => { const e = t.$trigger; if (e) { const i = e.dataset || {};
                    t.src = i.src || e.getAttribute("href") || t.src, t.type = i.type || t.type } })), e(!0, {}, T.defaults, i, s) }(t, i)), this.state = "init", this.items = t, this.bindHandlers(), this.attachPlugins(T.Plugins), this.trigger("init"), !0 === this.option("hideScrollbar") && this.hideScrollbar(), this.initLayout(), this.initCarousel(this.getSlides()), this.attachEvents(), this.state = "ready", this.trigger("ready"), this.$container.setAttribute("aria-hidden", "false") }
    bindHandlers() { for (const t of["onMousedown", "onKeydown", "onClick", "onCreateSlide", "onSettle", "onTouchMove", "onTouchEnd", "onTransform"]) this[t] = this[t].bind(this) }
    attachEvents() { document.addEventListener("mousedown", this.onMousedown), document.addEventListener("keydown", this.onKeydown), this.$container.addEventListener("click", this.onClick) }
    detachEvents() { document.removeEventListener("mousedown", this.onMousedown), document.removeEventListener("keydown", this.onKeydown), this.$container.removeEventListener("click", this.onClick) }
    initLayout() { this.$root = this.option("parentEl") || document.body; let t = this.option("template.main");
        t && (this.$root.insertAdjacentHTML("beforeend", this.localize(t)), this.$container = this.$root.querySelector(".fancybox__container")), this.$container || (this.$container = document.createElement("div"), this.$root.appendChild(this.$container)), this.$container.onscroll = () => (this.$container.scrollLeft = 0, !1), Object.entries({ class: "fancybox__container", role: "dialog", "aria-modal": "true", "aria-hidden": "true", "aria-label": this.localize("{{MODAL}}") }).forEach((t => this.$container.setAttribute(...t))), this.option("animated") && this.$container.classList.add("is-animated"), this.$backdrop = this.$container.querySelector(".fancybox__backdrop"), this.$backdrop || (this.$backdrop = document.createElement("div"), this.$backdrop.classList.add("fancybox__backdrop"), this.$container.appendChild(this.$backdrop)), this.$carousel = this.$container.querySelector(".fancybox__carousel"), this.$carousel || (this.$carousel = document.createElement("div"), this.$carousel.classList.add("fancybox__carousel"), this.$container.appendChild(this.$carousel)), this.$container.Fancybox = this, this.id = this.$container.getAttribute("id"), this.id || (this.id = this.options.id || ++E, this.$container.setAttribute("id", "fancybox-" + this.id)); const e = this.options.mainClass; return e && this.$container.classList.add(...e.split(" ")), document.documentElement.classList.add("with-fancybox"), this.trigger("initLayout"), this }
    getSlides() { const t = [...this.items]; return t.forEach((t => {!t.src && t.$trigger && t.$trigger instanceof HTMLImageElement && (t.src = t.$trigger.currentSrc || t.$trigger.src); let e = t.$thumb; const i = t.$trigger && t.$trigger.origTarget;
            i && (e = i instanceof HTMLImageElement ? i : i.querySelector("img")), !e && t.$trigger && (e = t.$trigger instanceof HTMLImageElement ? t.$trigger : t.$trigger.querySelector("img")), t.$thumb = e || null; let s = t.thumb;!s && t.$thumb && (s = e.currentSrc || e.src), s || t.type && "image" !== t.type || (s = t.src), t.thumb = s || null })), t }
    initCarousel(t) { return new m(this.$carousel, e(!0, {}, { classNames: { viewport: "fancybox__viewport", track: "fancybox__track", slide: "fancybox__slide" }, textSelection: !0, preload: this.option("preload"), friction: .88, slides: t, initialPage: this.options.startIndex, slidesPerPage: 1, infiniteX: this.option("infinite"), infiniteY: !0, l10n: this.option("l10n"), Dots: !1, Navigation: { classNames: { main: "fancybox__nav", button: "carousel__button", next: "is-next", prev: "is-prev" } }, Panzoom: { panOnlyZoomed: () => this.Carousel.pages.length < 2 && !this.options.dragToClose, lockAxis: () => { let t = this.Carousel.pages.length > 1 ? "x" : ""; return this.options.dragToClose && (t += "y"), t } }, on: { "*": (t, ...e) => this.trigger(`Carousel.${t}`, ...e), init: t => this.Carousel = t, createSlide: this.onCreateSlide, settle: this.onSettle } }, this.option("Carousel"))), this.options.dragToClose && this.Carousel.Panzoom.on({ touchMove: this.onTouchMove, afterTransform: this.onTransform, touchEnd: this.onTouchEnd }), this.trigger("initCarousel"), this }
    onCreateSlide(t, e) { const i = e.caption; if (i) { const t = document.createElement("div"),
                s = `fancybox__caption_${this.id}_${e.index}`;
            t.className = "fancybox__caption", t.innerHTML = i, t.setAttribute("id", s), e.$caption = e.$el.appendChild(t), e.$el.classList.add("has-caption"), e.$el.setAttribute("aria-labelledby", s) } }
    onSettle() { this.focus() }
    onClick(t) { if (t.defaultPrevented) return; if (t.target.closest(".fancybox__content")) return; if (window.getSelection().toString().length) return; const e = this.option("click"); if ("function" == typeof e) return e.call(this); switch (e) {
            case "close":
                this.close(); break;
            case "next":
                this.next() } }
    onTouchMove() { const t = this.getSlide().Panzoom; return !t || 1 === t.current.scale }
    onTouchEnd(t) { const e = t.drag.distanceY;
        (Math.abs(e) >= 150 || Math.abs(e) >= 35 && t.drag.elapsedTime < 350) && (this.option("hideClass") && (this.getSlide().hideClass = "fancybox-throwOut" + (t.current.y < 0 ? "Up" : "Down")), this.close()) }
    onTransform(t) { if (this.$backdrop) { const e = Math.abs(t.current.y),
                i = e < 1 ? "" : Math.max(0, Math.min(1, 1 - e / t.$content.clientHeight * 1.5));
            this.$container.style.setProperty("--fancybox-ts", i ? "0s" : ""), this.$container.style.setProperty("--fancybox-opacity", i) } }
    onMousedown() { document.body.classList.add("is-using-mouse") }
    onKeydown(t) { if (T.getInstance().id !== this.id) return;
        document.body.classList.remove("is-using-mouse"); const e = t.key; if ("Tab" === e && this.option("trapFocus")) return void this.focus(t); const i = this.option("keyboard"); if (!i || t.ctrlKey || t.altKey || t.shiftKey) return; const s = document.activeElement && document.activeElement.classList,
            n = s && s.contains("carousel__button"); if ("Escape" !== e && !n) { if (t.target.isContentEditable || -1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(t.target.nodeName)) return } if (!1 === this.trigger("keydown", e)) return; "Enter" !== e && t.preventDefault(); const o = i[e]; "function" == typeof this[o] && this[o]() }
    getSlide() { const t = this.Carousel; if (!t) return null; const e = null === t.page ? t.option("initialPage") : t.page,
            i = t.pages || []; return i.length && i[e] ? i[e].slides[0] : null }
    focus(t) { const e = t => { t.setActive ? t.setActive() : L ? t.focus({ preventScroll: !0 }) : t.focus() };
        t && t.preventDefault(); const i = this.getSlide().$el;
        i.tabIndex = 0; const s = [].slice.call(this.$container.querySelectorAll(["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'])),
            n = []; for (let t of s) { if (t.classList && t.classList.contains("fancybox__slide")) continue; const e = t.closest(".fancybox__slide");
            e ? e === i && n[t.hasAttribute("autofocus") ? "unshift" : "push"](t) : n.push(t) } if (!n.length) return;
        this.Carousel.pages.length > 1 && n.push(i); const o = n.indexOf(document.activeElement),
            a = t && !t.shiftKey,
            r = t && t.shiftKey; return a ? o === n.length - 1 ? e(n[0]) : e(n[o + 1]) : r ? e(0 === o ? n[n.length - 1] : n[o - 1]) : o < 0 ? e(n[0]) : void 0 }
    hideScrollbar() { if (!f) return; const t = window.innerWidth - document.documentElement.getBoundingClientRect().width,
            e = "fancybox-style-noscroll"; let i = document.getElementById(e);
        i || t && (i = document.createElement("style"), i.id = e, i.type = "text/css", i.innerHTML = `.compensate-for-scrollbar {padding-right: ${t}px;}`, document.getElementsByTagName("head")[0].appendChild(i), document.body.classList.add("compensate-for-scrollbar")) }
    revealScrollbar() { document.body.classList.remove("compensate-for-scrollbar"); const t = document.getElementById("fancybox-style-noscroll");
        t && t.remove() }
    clearContent(t) { this.Carousel.trigger("deleteSlide", t), t.$content && (t.$content.remove(), t.$content = null), t._className && t.$el.classList.remove(t._className) }
    setContent(t, e, i = {}) { let s; const n = t.$el; if (e instanceof HTMLElement ? ["img", "iframe", "video", "audio"].indexOf(e.nodeName.toLowerCase()) > -1 ? (s = document.createElement("div"), s.appendChild(e)) : s = e : (s = document.createElement("div"), s.innerHTML = e), !(s instanceof Element)) throw new Error("Element expected"); return t._className = `has-${i.suffix||t.type||"unknown"}`, n.classList.add(t._className), s.classList.add("fancybox__content"), "none" !== s.style.display && "none" !== window.getComputedStyle(s).getPropertyValue("display") || (s.style.display = "flex"), t.id && s.setAttribute("id", t.id), t.$content = s, n.insertBefore(s, n.querySelector(".fancybox__caption")), this.manageCloseButton(t), "loading" !== t.state && this.revealContent(t), s }
    manageCloseButton(t) { const e = void 0 === t.closeButton ? this.option("closeButton") : t.closeButton; if (!e || this.$closeButton && "inside" !== e) return; const i = document.createElement("button");
        i.classList.add("carousel__button", "is-close"), i.setAttribute("title", this.options.l10n.CLOSE), i.innerHTML = this.option("template.closeButton"), i.addEventListener("click", (t => this.close(t))), "inside" === e ? (t.$closeButton && t.$closeButton.remove(), t.$closeButton = t.$content.appendChild(i)) : this.$closeButton = this.$container.insertBefore(i, this.$container.firstChild) }
    revealContent(t) { this.trigger("reveal", t), t.$content.style.visibility = ""; let e = !1; "error" !== t.state && "ready" !== t.state && null === this.Carousel.prevPage && t.index === this.options.startIndex && (e = void 0 === t.showClass ? this.option("showClass") : t.showClass), e ? (t.state = "animating", this.animateCSS(t.$content, e, (() => { this.done(t) }))) : this.done(t) }
    animateCSS(t, e, i) { if (t && t.dispatchEvent(new CustomEvent("animationend", { bubbles: !0, cancelable: !0 })), !t || !e) return void("function" == typeof i && i()); const s = function(n) { n.currentTarget === this && (t.classList.remove(e), t.removeEventListener("animationend", s), i && i()) };
        t.addEventListener("animationend", s), t.classList.add(e) }
    done(t) { if ("init" !== this.state && "ready" !== this.state) return;
        t.state = "done", this.trigger("done", t); const e = this.getSlide();
        e && t.index === e.index && this.option("autoFocus") && this.focus() }
    setError(t, e) { t.state = "error", this.hideLoading(t), this.clearContent(t); const i = document.createElement("div");
        i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i, { suffix: "error" }) }
    showLoading(t) { t.state = "loading", this.trigger("load", t), t.$el.classList.add("is-loading"); let e = t.$el.querySelector(".fancybox__spinner");
        e || (e = document.createElement("div"), e.classList.add("fancybox__spinner"), e.innerHTML = this.option("template.spinner"), e.addEventListener("click", (() => { this.Carousel.Panzoom.velocity || this.close() })), t.$el.insertBefore(e, t.$el.firstChild)) }
    hideLoading(t) { const e = t.$el && t.$el.querySelector(".fancybox__spinner");
        e && (e.remove(), t.$el.classList.remove("is-loading")), "loading" === t.state && (t.state = "ready") }
    next() { const t = this.Carousel;
        t && t.pages.length > 1 && t.slideNext() }
    prev() { const t = this.Carousel;
        t && t.pages.length > 1 && t.slidePrev() }
    jumpTo(...t) { this.Carousel && this.Carousel.slideTo(...t) }
    close(t) { if (t && t.preventDefault(), ["closing", "customClosing", "destroy"].indexOf(this.state) > -1) return; if (!1 === this.trigger("shouldClose", t)) return; if (this.state = "closing", this.Carousel.Panzoom.destroy(), this.detachEvents(), this.trigger("closing", t), "destroy" === this.state) return;
        this.$container.setAttribute("aria-hidden", "true"), this.$container.classList.add("is-closing"); const e = this.getSlide(); if (this.Carousel.slides.forEach((t => { t.$content && t.index !== e.index && t.$content.remove() })), "closing" === this.state) { const t = void 0 === e.hideClass ? this.option("hideClass") : e.hideClass;
            this.animateCSS(e.$content, t, (() => { this.destroy() })) } }
    destroy() { this.state = "destroy", this.trigger("destroy"); const t = this.option("placeFocusBack") ? this.getSlide().$trigger : null; if (this.Carousel.destroy(), this.detachPlugins(), this.Carousel = null, this.options = {}, this.events = {}, this.$container.remove(), this.$container = this.$backdrop = this.$carousel = null, t)
            if (L) t.focus({ preventScroll: !0 });
            else { const e = document.body.scrollTop;
                t.focus(), document.body.scrollTop = e }
        const e = T.getInstance();
        e ? e.focus() : (document.documentElement.classList.remove("with-fancybox"), document.body.classList.remove("is-using-mouse"), this.revealScrollbar()) }
    static show(t, e = {}) { return new T(t, e) }
    static fromEvent(t, e = {}) { if (t.defaultPrevented) return; if (t.button && 0 !== t.button) return; if (t.ctrlKey || t.metaKey || t.shiftKey) return; let i, s, n, o = !1,
            a = t.target; if ((a.matches("[data-fancybox-trigger]") || (a = a.closest("[data-fancybox-trigger]"))) && (n = a && a.dataset && a.dataset.fancyboxTrigger), n) { const t = document.querySelectorAll(`[data-fancybox="${n}"]`),
                e = parseInt(a.dataset.fancyboxIndex, 10) || 0;
            a = t.length ? t[e] : a }
        a || (a = t.target), Array.from(T.openers.keys()).reverse().some((e => { if (i = a, i.matches(e) || (i = i.closest(e))) return t.preventDefault(), s = e, !0 })), s && (e.target = i, i.origTarget = t.target, o = T.fromOpener(s, e)); const r = T.getInstance(); return r && "ready" === r.state && t.detail && document.body.classList.add("is-using-mouse"), o }
    static fromOpener(t, i = {}) { let s = [],
            n = i.startIndex || 0,
            o = (i = e({}, i, T.openers.get(t))).groupAttr;
        void 0 === o && (o = "data-fancybox"); let a = i.target; if (o) { if (a && t && t === `[${o}]`) { const e = a.getAttribute(`${o}`);
                t = !(!e || !e.length || "true" === e) && `[${o}='${e}']` } } else t = !1; if (t && (s = [].slice.call(document.querySelectorAll(t))), !s.length && a && (s = [a]), !s.length) return !1; const r = T.getInstance(); return !(r && s.indexOf(r.options.$trigger) > -1) && (n = a ? s.indexOf(a) : n, s = s.map((function(t) { const e = ["false", "0", "no", "null"],
                i = ["true", "1", "yes"],
                s = Object.assign({}, t.dataset); for (let [t, n] of Object.entries(s))
                if ("string" == typeof n || n instanceof String)
                    if (e.indexOf(n) > -1) s[t] = !1;
                    else if (i.indexOf(s[t]) > -1) s[t] = !0;
            else try { s[t] = JSON.parse(n) } catch (e) { s[t] = n }
            return delete s.fancybox, delete s.type, t instanceof Element && (s.$trigger = t), s })), new T(s, e({}, i, { startIndex: n, $trigger: a }))) }
    static bind(t, e = {}) { if (f) { if (!T.openers.size) { document.body.addEventListener("click", T.fromEvent, !1); for (const [t, e] of Object.entries(T.Plugins || {})) e.Fancybox = this, "function" == typeof e.create && e.create() }
            T.openers.set(t, e) } }
    static unbind(t) { T.openers.delete(t), T.openers.size || T.destroy() }
    static destroy() { let t; for (; t = T.getInstance();) t.destroy();
        T.openers = new Map, document.body.removeEventListener("click", T.fromEvent, !1) }
    static getInstance(t) { let e = [];
        e = t ? [document.getElementById(`fancybox-${t}`)] : Array.from(document.querySelectorAll(".fancybox__container")).reverse(); for (const t of e) { const e = t && t.Fancybox; if (e && "closing" !== e.state && "customClosing" !== e.state) return e } return null }
    static close(t = !0) { let e = null; for (; e = T.getInstance();)
            if (e.close(), !t) return } }
T.version = "4.0.0-alpha.4", T.defaults = { startIndex: 0, preload: 1, infinite: !0, showClass: "fancybox-zoomInUp", hideClass: "fancybox-fadeOut", animated: !0, hideScrollbar: !0, parentEl: null, mainClass: null, autoFocus: !0, trapFocus: !0, placeFocusBack: !0, click: "close", closeButton: "inside", dragToClose: !0, keyboard: { Escape: "close", Delete: "close", Backspace: "close", PageUp: "next", PageDown: "prev", ArrowUp: "next", ArrowDown: "prev", ArrowRight: "next", ArrowLeft: "prev" }, template: { closeButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>', spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>', main: null }, l10n: { CLOSE: "Close", NEXT: "Next", PREV: "Previous", MODAL: "You can close this modal content with the ESC key", ERROR: "Something Went Wrong, Please Try Again Later", IMAGE_ERROR: "Image Not Found", ELEMENT_NOT_FOUND: "HTML Element Not Found", AJAX_NOT_FOUND: "Error Loading AJAX : Not Found", AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden", IFRAME_ERROR: "Error Loading Page" } }, T.openers = new Map, T.Plugins = S, T.isMobile = () => !!navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), T.bind("[data-fancybox]");
export { m as Carousel, T as Fancybox, h as Panzoom };