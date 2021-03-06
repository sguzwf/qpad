#@换@ 替换

如果要把“foo”替换成“bar”的话，只需搜索“foo”并将找到的文字手动替换成“bar”，然后按照提示信息操作给出的按钮即可。

#@正@ 智能替换

在使用带有括号的正则表达式进行搜索之后，只需对找到的内容进行编辑即可启用“智能替换”。

例如，如果你用`obj\.([a-z_]+)`找到了`obj.foo`然后把它替换成了`obj['foo']`，那么“替换下一个”的按钮就会把`obj.bar`替换成`obj['bar']`。

你也可以用“@叠@”按钮把普通字符串转换成此类表达式。

#@换@ 编辑扩散

如果需要同时编辑多行，可以用ALT+SHIFT+↓或者ALT+SHIFT+↑来选中这些行，然后手动编辑器中一行。QPad会自动把你的编辑扩散到其他行。之后可以用左侧的替换按钮来应用扩散出的编辑内容。

#@本@ 脚本簿

菜单中的“工具” - “脚本簿……”可以打开每个工程的脚本簿。

这里可以放置一些编译/运行用的脚本，执行脚本的方式类似IPython。QPad会在脚本的输出中查找错误信息，并将它们对应到原始文件中的位置。

#@签@ 重要位置

书签、编译错误或未保存的修改都是“重要位置”。这些位置会在垂直滚动条中高亮出来。使用F2和SHIFT+F2可以在这些位置之间快速跳转。

#@开@ 浏览文件

菜单中的“文件” - “文件列表……”会调出一个“文件”列表。默认情况下这里会列出你用QPad编辑的所有工程。如果要把一个目录加到里面，拖进QPad里就好。

可以通过在搜索栏里面输入文件名来搜索近期打开过的文件或工程文件。

也可以输入`./`之类的路径来浏览文件。

#@还@ 最大化

在编辑窗口中按ESC可以将其最大化。

再按一次可以还原。

#@去@ 查找函数或类

菜单中的“查找” - “跳转到……”可以调出文件中函数和类的列表。这里可以用函数或类的名称或缩写进行查找。

也可以通过键入数字来跳转到给定行。也可以使用`10000-9000+234`之类的表达式。

#@プ@ 关键变量贴士

可以在程序中添加`//@qpadvar kv A variable used for important things`这样的注释。这样当光标移动到和注释同一层的地方之后，QPad会自动给出此类内容的贴士。
