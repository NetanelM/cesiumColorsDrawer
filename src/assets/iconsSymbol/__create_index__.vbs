'Settings
outFile="__index__.json"
Set objFSO = CreateObject("Scripting.FileSystemObject")
CurrentDirectory = objFSO.GetAbsolutePathName(".")

'file system objects
Set objFolder = objFSO.GetFolder(CurrentDirectory)
Set objIndexFile = objFSO.CreateTextFile(outFile,True)
Set colFiles = objFolder.Files


'Encoding 
'Dim JSEngine
'Set JSEngine = CreateObject("__MSscript.ocx")
'    JSEngine.Language = "JScript"

'Function UrlEncode(s)
'    UrlEncode = JSEngine.CodeObject.encodeURIComponent(s)
'    UrlEncode = Replace(UrlEncode, "'", "%27")
'    UrlEncode = Replace(UrlEncode, """", "%22")
'End Function

'loop
first = True
objIndexFile.WriteLine "["
For Each objFile in colFiles
	
	If objFSO.GetExtensionName(objFile.Path) = "svg" Then
		
		
		If first  Then
			first = false
		Else
			objIndexFile.WriteLine ","
		End If 
		
		objIndexFile.Write vbtab + chr(34) + Escape(objFile.Name) + chr(34)
	End If 
Next
'finish json
objIndexFile.WriteLine
objIndexFile.Write "]"
objIndexFile.Close