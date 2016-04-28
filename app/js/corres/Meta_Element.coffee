createElements = ( elems, ns ) ->
	a_o = []

	ns ||= null
	switch typeof elems
		when "string"
			o = document.createTextNode elems
			a_o.push o
			break
		when "object"
			elems = [elems] if elems.constructor != Array
			for elem in elems
				if typeof elem.tag != "undefined"
					if elem.tag == "#text"
						o = document.createTextNode elem.value
					else
						if ns
							o = document.createElementNS ns, elem.tag
						else
							o = document.createElement elem.tag
						if typeof elem.child != "undefined"
							t_childs = createElements(elem.child, ns)
							for t_child in t_childs
								o.appendChild(t_child);
						for attr in elem
							if elem.hasOwnProperty(attr) && elem[attr] && attr != "tag" && attr != "child"
								if attr == "value"
									o.value = elem[attr]
								else
									if ns
										o.setAttributeNS null, attr, elem[attr]
									else
										o.setAttribute attr, elem[attr]
					a_o.push o
			break
	a_o
