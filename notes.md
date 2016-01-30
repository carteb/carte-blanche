SingleEntryPlugin
---------

This takes care of receiving a single entry (usually JS, but also can be something else like JSON) and interprets it.

MultiEntryPlugin
---------

In case you want to compile multiple application entries from one Webpack configuration this is used to make sure MultiEntry is setup properly.

MultiEntryDependency & SingleEntryDependency are added in the `compilation` ste. In the `make` step a SingleEntryDependency is created for every entry point

Note: this looks scary: `dep.loc = this.name + ":" + (100000 + idx);`
What if 100000 is exceeded by an entry?

EntryOptionPlugin
---------

Figures out if the entry options contain a single entry point for the app or multiple ones. Depending on that `SingleEntryPlugin` & `MultiEntryPlugin` are used.




NodeTemplatePlugin
---------

Should compile and run a simple module.
It applies NodeChunkTemplatePlugin, NodeChunkTemplatePlugin & NodeHotUpdateChunkTemplatePlugin.

NodeMainTemplatePlugin
---------

Seems to take care of the local variables & require part of a the root module including some bootstrapping for hot-reload. In general more like a setup for the endresult?

NodeChunkTemplatePlugin
---------

This is responsible for how a chunk (file probably?) is rendered.




NodeTargetPlugin
---------

Instantiates a new ExternalsPlugin with `commonjs`.


LibraryTemplatePlugin
---------

This let's you decide between how these modules are compiled. You can choose between:

var, assign, this, window, global, commonjs, commonjs2, amd, umd, umd2, jsonp

Not sure 



WebPackOptionsApply
---------

This is initializing different Plugins for different environments. I was quite surprised that these environments are hard-coded into webpack. Not that it's bad. I just didn't expect it. These are the environments:

web, webworker, node, async-node, node-webkit, atom, electron, electron-main, electron-renderer
