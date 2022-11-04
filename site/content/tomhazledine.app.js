/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d6378ce3a3c64b924d8e";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/analytics */ \"./src/js/modules/analytics.js\");\n/* harmony import */ var _modules_analytics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_analytics__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _modules_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cookies */ \"./src/js/modules/cookies.js\");\n/* harmony import */ var _modules_sidenotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/sidenotes */ \"./src/js/modules/sidenotes.js\");\n/* harmony import */ var _modules_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/selection */ \"./src/js/modules/selection.js\");\n/* harmony import */ var _modules_dark_mode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/dark-mode */ \"./src/js/modules/dark-mode.js\");\n/* harmony import */ var _modules_show_hide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/show-hide */ \"./src/js/modules/show-hide.js\");\n/* harmony import */ var _search_integrated_search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search/integrated-search */ \"./src/js/search/integrated-search.js\");\n/* harmony import */ var _search_integrated_search__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_search_integrated_search__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n // import Prism from \"prismjs\";\n// Code highlighting\n// Prism.highlightAll();\n// Get the size of our window\n\nvar window_width = window.innerWidth; // Run these functions on-load:\n\nObject(_modules_cookies__WEBPACK_IMPORTED_MODULE_2__[\"setNewsletterCookie\"])();\nObject(_modules_selection__WEBPACK_IMPORTED_MODULE_4__[\"setupTweetSelection\"])();\nObject(_modules_dark_mode__WEBPACK_IMPORTED_MODULE_5__[\"initDarkMode\"])();\nObject(_modules_show_hide__WEBPACK_IMPORTED_MODULE_6__[\"initShowHide\"])(); // Run these functions on-load if the screen is wider than 750px:\n\nvar firstStylesheetOnPage = document.querySelector('link[rel=\"stylesheet\"]');\nvar isNaked = firstStylesheetOnPage.getAttribute(\"data-naked\");\nvar showSidenotes = isNaked === null ? window_width > 750 : window_width > 750 && parseInt(isNaked, 10) <= 0;\n\nif (showSidenotes) {\n  Object(_modules_sidenotes__WEBPACK_IMPORTED_MODULE_3__[\"convert_footnotes_to_sidenotes\"])();\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/modules/analytics.js":
/*!*************************************!*\
  !*** ./src/js/modules/analytics.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var intro_note_link = document.getElementsByClassName(\"intro-note-link\");\n\nfor (var i = intro_note_link.length - 1; i >= 0; i--) {\n  intro_note_link[i].addEventListener(\"click\", track_intro_note_click);\n}\n\nfunction track_intro_note_click(e) {\n  e.preventDefault();\n  var target_url = e.target.href;\n  ga(\"send\", \"event\", \"Intro Note Link\", \"click\", target_url);\n  window.location = target_url;\n}\n\nvar tweet_widget_link = document.getElementById(\"tweet-widget\");\n\nif (tweet_widget_link) {\n  tweet_widget_link.addEventListener(\"click\", track_tweet_widget_click);\n}\n\nfunction track_tweet_widget_click(e) {\n  e.preventDefault();\n  var target_url = e.target.href;\n  ga(\"send\", \"event\", \"Tweet Selection Link\", \"click\", target_url);\n  window.location = target_url;\n}\n\n//# sourceURL=webpack:///./src/js/modules/analytics.js?");

/***/ }),

/***/ "./src/js/modules/cookies.js":
/*!***********************************!*\
  !*** ./src/js/modules/cookies.js ***!
  \***********************************/
/*! exports provided: setNewsletterCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setNewsletterCookie\", function() { return setNewsletterCookie; });\n/* harmony import */ var _vendor_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/cookies */ \"./src/js/vendor/cookies.js\");\n\nvar setNewsletterCookie = function setNewsletterCookie() {\n  var days = 2592000; // This is 30 days in seconds\n\n  var page_load_count = _vendor_cookies__WEBPACK_IMPORTED_MODULE_0__[\"docCookies\"].getItem(\"page_load_count\");\n\n  if (page_load_count) {\n    page_load_count++;\n    _vendor_cookies__WEBPACK_IMPORTED_MODULE_0__[\"docCookies\"].setItem(\"page_load_count\", page_load_count, days, \"/\");\n  } else {\n    _vendor_cookies__WEBPACK_IMPORTED_MODULE_0__[\"docCookies\"].setItem(\"page_load_count\", 1, days, \"/\");\n  }\n\n  if (page_load_count > 4) {// console.log('looks like you\\'ve been here a few times');\n  }\n};\n\n//# sourceURL=webpack:///./src/js/modules/cookies.js?");

/***/ }),

/***/ "./src/js/modules/dark-mode.js":
/*!*************************************!*\
  !*** ./src/js/modules/dark-mode.js ***!
  \*************************************/
/*! exports provided: initDarkMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initDarkMode\", function() { return initDarkMode; });\nvar setDarkMode = function setDarkMode() {\n  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var wrapper = document.querySelector(\":root\");\n\n  if (active) {\n    wrapper.setAttribute(\"data-theme\", \"dark\");\n    localStorage.setItem(\"theme\", \"dark\");\n  } else {\n    wrapper.setAttribute(\"data-theme\", \"light\");\n    localStorage.setItem(\"theme\", \"light\");\n  }\n};\n\nvar toggleDarkMode = function toggleDarkMode() {\n  var theme = document.querySelector(\":root\").getAttribute(\"data-theme\"); // If the current theme is \"light\", we want to activate dark\n\n  setDarkMode(theme === \"light\");\n};\n\nvar initDarkMode = function initDarkMode() {\n  var query = window.matchMedia(\"(prefers-color-scheme: dark)\");\n  var themePreference = localStorage.getItem(\"theme\");\n  var active = query.matches;\n\n  if (themePreference === \"dark\") {\n    active = true;\n  }\n\n  if (themePreference === \"light\") {\n    active = false;\n  }\n\n  setDarkMode(active);\n  query.addListener(function (e) {\n    return setDarkMode(e.matches);\n  });\n  var toggleButton = document.querySelector(\".js__dark-mode-toggle\");\n  toggleButton.addEventListener(\"click\", toggleDarkMode);\n};\n\n//# sourceURL=webpack:///./src/js/modules/dark-mode.js?");

/***/ }),

/***/ "./src/js/modules/selection.js":
/*!*************************************!*\
  !*** ./src/js/modules/selection.js ***!
  \*************************************/
/*! exports provided: setupTweetSelection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupTweetSelection\", function() { return setupTweetSelection; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// CHECK RELATIONSHIP\n// Work out if element-1 is a descendant of element-2.\nvar check_relationship = function check_relationship(parent, child) {\n  var node = child.parentNode;\n\n  while (node != null) {\n    if (node == parent) {\n      return true;\n    }\n\n    node = node.parentNode;\n  }\n\n  return false;\n}; // GET SELECTED TEXT\n// If some text has been selected, get it (using whichever browser\n// selection API is available to us). If not, return false.\n\n\nvar get_selection = function get_selection() {\n  var position = {};\n  var text = false;\n\n  if (window.getSelection) {\n    var selection = window.getSelection();\n    text = selection.toString();\n\n    if (text.length > 0 && text != \" \") {\n      var range = selection.getRangeAt(0);\n      var range_bounding_rect = range.getBoundingClientRect();\n      var calculated_to_position = window.scrollY + range_bounding_rect.top;\n      var center_point = (range_bounding_rect.left + range_bounding_rect.right) / 2;\n      position.x = Math.round(calculated_to_position);\n      position.y = Math.round(center_point);\n    }\n  } else if (document.selection && document.selection.type != \"Control\") {\n    text = document.selection.createRange().text;\n  }\n\n  return {\n    text: text,\n    position: position\n  };\n}; // BUILD TWEET URL AND CONTENT\n// Trim the text to the appropriate length, then parse the text into\n// tweet-friendly format, and add a page-link and my username.\n\n\nvar build_tweet_content = function build_tweet_content(text) {\n  // NOTE: use %23 rather than # if adding a hashtag.\n  // Which twitter username do we want to mention in the tweet?\n  var username = \"@thomashazledine\"; // What's the page's URL?\n\n  var link = window.location.href; // t.co URL-shortener length\n\n  var tco_length = 22; // How many characters can we use in a tweet?\n\n  var max_length = 280; // How many characters is our username?\n\n  var username_length = username.length + 1; // \"1\" accounts for a space.\n  // Calculate how many characters we have left over for text.\n\n  var max_tweet_length = max_length - username_length - tco_length; // Crop our text to fit the remaining character-count.\n\n  if (text.length > max_tweet_length) {\n    var trimmed_text = text.substring(0, max_tweet_length - 3); // Remove start/end spaces.\n\n    trimmed_text = trimmed_text.replace(/^\\s+|\\s+$/g, \"\"); // Add an ellipsis if the text has been cropped.\n\n    trimmed_text = trimmed_text + \"…\";\n  } else {\n    // Remove start/end spaces.\n    var trimmed_text = text.replace(/^\\s+|\\s+$/g, \"\");\n  } // Replace spaces with \"+\" (so the sharing-link works).\n\n\n  var parsed_text = trimmed_text.replace(/ /gi, \"+\"); // Build the full tweet link.\n\n  var tweet_href = \"https://twitter.com/intent/tweet?source=webclient&text=\".concat(parsed_text, \"+\").concat(link, \"+\").concat(username);\n  return tweet_href;\n}; // ON-SELECTION TRIGGER\n// Initialise this function whenever some text is selected.\n\n\nvar selection_handler = function selection_handler(event, tweet_widget) {\n  var click_target = event.target;\n  var selectable_wrapper = document.getElementsByClassName(\"selectable-area\");\n\n  var is_child = _toConsumableArray(selectable_wrapper).map(function (wrapper) {\n    return check_relationship(wrapper, click_target);\n  });\n\n  var is_any_child = is_child.reduce(function (acc, c) {\n    return c ? c : acc;\n  }); // Only run the selection-code if the click\n  // happens inside a `.selectable-area` element.\n\n  if (is_any_child) {\n    // Get the selected text\n    var selection = get_selection(); // If there is a selection & the selection\n    // is more than 15 characters long...\n\n    if (selection.text && selection.text.length > 15) {\n      // Turn selection into \"tweet\" object.\n      var tweet_url = build_tweet_content(selection.text); // Set the link for the widget.\n\n      tweet_widget.setAttribute(\"href\", tweet_url); // Make the widget visible.\n\n      tweet_widget.style.display = \"block\"; // Set the position for the tweet widget (using the\n      // global vars set by the get_selection function).\n\n      tweet_widget.style.top = selection.position.x + \"px\";\n      tweet_widget.style.left = selection.position.y + \"px\";\n    } else {\n      // Hide the widget if there's no content to display.\n      tweet_widget.style.display = \"none\";\n    }\n  } else {\n    // Hide the widget if there's no content to display.\n    tweet_widget.style.display = \"none\";\n  }\n}; // ON-SELECTION EVENT LISTENER\n// There is no direct listener for selection events, so we need\n// to check for events if the mouse or a key has been pressed.\n\n\nvar setupTweetSelection = function setupTweetSelection() {\n  // We'll always want to use the same element as a wrapper\n  // for our widget. This is it.\n  var tweet_widget = document.getElementById(\"tweet-widget\");\n  var selectable_wrapper = document.querySelector(\".selectable-area\");\n\n  if (tweet_widget && selectable_wrapper) {\n    document.addEventListener(\"keyup\", function (e) {\n      return selection_handler(e, tweet_widget);\n    }, false);\n    document.addEventListener(\"mouseup\", function (e) {\n      return selection_handler(e, tweet_widget);\n    }, false);\n  }\n};\n\n//# sourceURL=webpack:///./src/js/modules/selection.js?");

/***/ }),

/***/ "./src/js/modules/show-hide.js":
/*!*************************************!*\
  !*** ./src/js/modules/show-hide.js ***!
  \*************************************/
/*! exports provided: initShowHide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initShowHide\", function() { return initShowHide; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar initShowHide = function initShowHide() {\n  var toggleSections = document.querySelectorAll(\".js__toggleVisibility\");\n\n  _toConsumableArray(toggleSections).map(function (toggleSection) {\n    var toggle = toggleSection.querySelector(\".js__showHideToggle\");\n    var target = toggleSection.querySelector(\".js__showHideArea\");\n    var child = target.querySelector(\".js__showHideAreaInner\");\n    var childRect = child.getBoundingClientRect();\n    var targetHeight = \"\".concat(childRect[\"height\"], \"px\");\n\n    if (target.classList.contains(\"active\")) {\n      target.style.maxHeight = targetHeight;\n    }\n\n    var setTabIndices = function setTabIndices(parent) {\n      var on = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n      var tabbableThings = parent.querySelectorAll(\".js__tabbable\");\n      tabbableThings.forEach(function (thing) {\n        thing.tabIndex = on ? \"0\" : \"-1\";\n      });\n    };\n\n    toggle.addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      e.stopPropagation();\n      var childRect = child.getBoundingClientRect();\n      var targetHeight = \"\".concat(childRect[\"height\"], \"px\");\n      e.preventDefault();\n\n      if (target.classList.contains(\"active\")) {\n        target.classList.remove(\"active\");\n        toggle.classList.remove(\"active\");\n        target.style.maxHeight = 0;\n        setTabIndices(target, false);\n      } else {\n        target.classList.add(\"active\");\n        toggle.classList.add(\"active\");\n        target.style.maxHeight = targetHeight;\n        setTabIndices(target, true);\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/js/modules/show-hide.js?");

/***/ }),

/***/ "./src/js/modules/sidenotes.js":
/*!*************************************!*\
  !*** ./src/js/modules/sidenotes.js ***!
  \*************************************/
/*! exports provided: convert_footnotes_to_sidenotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convert_footnotes_to_sidenotes\", function() { return convert_footnotes_to_sidenotes; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/**\n * FOOTNOTES TO SIDENOTES\n *\n * Turn the footnotes-markup (outputed by Jetpack)\n * into the markup needed for sidenotes. The reason\n * for doing this is to preserve the accessibility\n * of our posts (the footnotes markup works fine\n * without any CSS or JS, and shows up as-expected\n * in RSS feeds) but allow the full site to have\n * elegant footnotes.\n */\nvar convert_footnotes_to_sidenotes = function convert_footnotes_to_sidenotes() {\n  // First things first, let's get all the footnotes\n  // on the page. We'll need to pair the in-text links\n  // (we'll need them when we want to position the\n  // sidenotes) with the footnotes.\n  var footnotes_wrapper = document.querySelector(\".footnotes\"); // Only try to create our sidenotes if we actually\n  // have some footnotes...\n\n  if (footnotes_wrapper) {\n    var footnotes = footnotes_wrapper.getElementsByTagName(\"li\"); // Loop through the footnotes and get their IDs\n    // (which we can use to find the in-text links)\n    // and their content.\n\n    var sidenotes = _toConsumableArray(footnotes).map(function (footnote) {\n      var footnoteLink = footnote.querySelector(\".footnote-backref\");\n      footnoteLink.remove();\n      var content = footnote.innerHTML;\n      return {\n        id: footnote.id,\n        content: content.trim()\n      };\n    });\n\n    footnotes_wrapper.remove(); // Loop through the sidenotes. Build the sidenote\n    // markup, then swap it with the link markup.\n\n    sidenotes.map(function (sidenote) {\n      // Get the link element.\n      var sidenote_link = document.querySelectorAll(\"a[href='#\" + sidenote.id + \"']\"); // Create a new element to hold our sidenote.\n\n      var sidenote_markup = document.createElement(\"span\"); // Give it a class.\n\n      sidenote_markup.className = \"sidenote\"; // Add the content.\n\n      sidenote_markup.innerHTML = '<span class=\"sidenote-bracket\"> (</span>' + sidenote.content + '<span class=\"sidenote-bracket\">)</span>'; // Swap the link with the new markup.\n\n      var sidenote_link_parent = sidenote_link[0].parentNode;\n      sidenote_link_parent.parentNode.replaceChild(sidenote_markup, sidenote_link_parent);\n    }); // Add has_sidenotes class to entry-content.\n\n    var entry_content_wrapper = document.querySelector(\".entry-content\");\n    entry_content_wrapper.className += \" has-sidenotes\";\n    var footnotesSeparator = document.querySelector(\".footnotes-sep\");\n    footnotesSeparator.remove();\n  }\n};\n\n//# sourceURL=webpack:///./src/js/modules/sidenotes.js?");

/***/ }),

/***/ "./src/js/search/integrated-search.js":
/*!********************************************!*\
  !*** ./src/js/search/integrated-search.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var searchToggle = document.querySelector(\".js__integrated-search__toggle\");\nvar searchForm = document.querySelector(\".js__integrated-search__form\");\nvar searchFormBody = document.querySelector(\".js__integrated-search__form-body\");\nvar searchInput = document.querySelector(\".js__integrated-search__input\");\n\nvar toggleSearch = function toggleSearch(e) {\n  e.preventDefault();\n\n  if (searchFormBody.classList.contains(\"hidden\")) {\n    searchFormBody.classList.remove(\"hidden\");\n    searchInput.focus();\n  } else if (searchInput.value.length > 0) {\n    searchForm.submit();\n  } else {\n    searchFormBody.classList.add(\"hidden\");\n  }\n};\n\nsearchToggle.addEventListener(\"click\", toggleSearch);\n\n//# sourceURL=webpack:///./src/js/search/integrated-search.js?");

/***/ }),

/***/ "./src/js/vendor/cookies.js":
/*!**********************************!*\
  !*** ./src/js/vendor/cookies.js ***!
  \**********************************/
/*! exports provided: docCookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"docCookies\", function() { return docCookies; });\n/*\\\n|*|\n|*|  :: cookies.js ::\n|*|\n|*|  A complete cookies reader/writer framework with full unicode support.\n|*|\n|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie\n|*|\n|*|  This framework is released under the GNU Public License, version 3 or later.\n|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html\n|*|\n|*|  Syntaxes:\n|*|\n|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])\n|*|  * docCookies.getItem(name)\n|*|  * docCookies.removeItem(name[, path], domain)\n|*|  * docCookies.hasItem(name)\n|*|  * docCookies.keys()\n|*|\n\\*/\nvar docCookies = {\n  getItem: function getItem(sKey) {\n    return decodeURIComponent(document.cookie.replace(new RegExp(\"(?:(?:^|.*;)\\\\s*\" + encodeURIComponent(sKey).replace(/[\\-\\.\\+\\*]/g, \"\\\\$&\") + \"\\\\s*\\\\=\\\\s*([^;]*).*$)|^.*$\"), \"$1\")) || null;\n  },\n  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {\n    if (!sKey || /^(?:expires|max\\-age|path|domain|secure)$/i.test(sKey)) {\n      return false;\n    }\n\n    var sExpires = \"\";\n\n    if (vEnd) {\n      switch (vEnd.constructor) {\n        case Number:\n          sExpires = vEnd === Infinity ? \"; expires=Fri, 31 Dec 9999 23:59:59 GMT\" : \"; max-age=\" + vEnd;\n          break;\n\n        case String:\n          sExpires = \"; expires=\" + vEnd;\n          break;\n\n        case Date:\n          sExpires = \"; expires=\" + vEnd.toUTCString();\n          break;\n      }\n    }\n\n    document.cookie = encodeURIComponent(sKey) + \"=\" + encodeURIComponent(sValue) + sExpires + (sDomain ? \"; domain=\" + sDomain : \"\") + (sPath ? \"; path=\" + sPath : \"\") + (bSecure ? \"; secure\" : \"\");\n    return true;\n  },\n  removeItem: function removeItem(sKey, sPath, sDomain) {\n    if (!sKey || !this.hasItem(sKey)) {\n      return false;\n    }\n\n    document.cookie = encodeURIComponent(sKey) + \"=; expires=Thu, 01 Jan 1970 00:00:00 GMT\" + (sDomain ? \"; domain=\" + sDomain : \"\") + (sPath ? \"; path=\" + sPath : \"\");\n    return true;\n  },\n  hasItem: function hasItem(sKey) {\n    return new RegExp(\"(?:^|;\\\\s*)\" + encodeURIComponent(sKey).replace(/[\\-\\.\\+\\*]/g, \"\\\\$&\") + \"\\\\s*\\\\=\").test(document.cookie);\n  },\n  keys:\n  /* optional method: you can safely remove it! */\n  function keys() {\n    var aKeys = document.cookie.replace(/((?:^|\\s*;)[^\\=]+)(?=;|$)|^\\s*|\\s*(?:\\=[^;]*)?(?:\\1|$)/g, \"\").split(/\\s*(?:\\=[^;]*)?;\\s*/);\n\n    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {\n      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);\n    }\n\n    return aKeys;\n  }\n};\n\n//# sourceURL=webpack:///./src/js/vendor/cookies.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ })

/******/ });