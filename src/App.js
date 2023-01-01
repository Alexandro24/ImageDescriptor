import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DivImageBox } from './components/DivImageBox';
import { DivGalleryUpload } from './components/DivGalleryUpload';
import { DivShapeTool } from './components/DivShapeTool';
import { DivInsertTextTool } from './components/DivInsertTextTool';
import html2canvas from 'html2canvas';

import './GeneralStyles.css';
import './Responsive.css';
import './FrameWorkArea.css';
import './Tools.css';

const App = () => {

	const initialFrame = [
		{
			id: uuidv4(), imageSRC: '/img/img000.jpg', selected: false,
			overley: 'normal', widthX: 200, heightY: 200
		},

	];
	const initialArrowTool = [
		{
			id: uuidv4(), imageSRC: '/img/flecha1.png', selected: false,
			widthX: 50, heightY: 50, rotate: 0
		},
		{
			id: uuidv4(), imageSRC: '/img/flecha2.png', selected: false,
			widthX: 50, heightY: 50, rotate: 0
		},
		{
			id: uuidv4(), imageSRC: '/img/flecha3.png', selected: false,
			widthX: 50, heightY: 50, rotate: 0
		},

	];

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [arregloImg, setArregloImg] = useState(initialFrame);
	const [arregloTextTool, setArregloTextTool] = useState([]);
	const [arregloShape, setArregloShape] = useState([]);
	const [arregloShapeTool, setArregloShapeTool] = useState(initialArrowTool);

	const inputName = useRef(null);


	/**--------------------------------------------- Insert image function ----------------------------------------------------------------- */

	const handleImageChange = (e) => {

		// console.log(e.target.files[])

		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

			/*console.log("filesArray: ", filesArray);*/

			setSelectedFiles((prevImages) => prevImages.concat(filesArray));

			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);

		}
	};

	/* Esta funcion es invocada desde:
	<div className="result responsive">{renderPhotos(selectedFiles)}</div> */
	const renderPhotos = (source) => {

		return source.map((photo) => {

			return <DivGalleryUpload src={photo} id={uuidv4()} GivePhotoFiles={GivePhotoFiles} />
		});
	};

	/**--------------------------------------------- Tools function ----------------------------------------------------------------- */

	/**Delete Function */
	/**Para que un  elemento del array sea eliminado debe estar seleccionado y su propiedad select a true */

	const GivePhotoFiles = (src) => {
		console.log(src);

		const newArray = arregloImg.map((el) => {
			if (el.selected === true) {
				el.imageSRC = src;
			}
			return el;
		})

		setArregloImg(newArray);

	}


	const HandleDelete = (event) => {

		if (event.target.value === "CuadroMenos") {

			const newArray = arregloImg.filter((obj) => !obj.selected);
			setArregloImg(newArray);
		}
	}

	/**Add Function */

	const HandleAdd = (event) => {


		if (event.target.value === "CuadroMas") {
			const newArray = [...arregloImg];
			newArray.push({
				id: uuidv4(), imageSRC: '/img/img000.jpg', selected: false,
				overley: 'normal', widthX: 200, heightY: 200
			},)
			setArregloImg(newArray);
		}

	}

	/**Set Function */

	const HandleSetElement = (event) => {


		if (event.target.value === "SeleccionarTodo") {

			const newArray = arregloImg.map((el) => {
				el.selected = true;
				return el;
			})

			setArregloImg(newArray);
		}
		if (event.target.value === "QuitarSeleccion") {

			const newArray = arregloImg.map((el) => {
				if (el.selected === true) {
					el.selected = false;
				}
				return el;
			})

			setArregloImg(newArray);
		}
		if (event.target.value === "Borrarcontenido") {

			const newArray = arregloImg.map((el) => {
				if (el.selected === true) {
					el.imageSRC = '/img/img000.jpg';
				}
				return el;
			})

			setArregloImg(newArray);
		}

	}

	/**select and unselect interfase */

	const HandleSelect = (id) => {

		const newArray = [...arregloImg];

		const item = newArray.find((el) => el.id === id);

		item.selected = !item.selected;

		setArregloImg(newArray);

	}

	/**Capture function */


	const HandleCapture = () => {
		alert("Trabajo capturado!!");

		html2canvas(document.querySelector(".frameWorkArea")).then(canvas => {
			var img = canvas.toDataURL("image/png");

			var link = document.createElement('a');
			link.download = 'captura.png';
			link.href = img;
			link.click();

		});
	}

	/**----------------------------------------- Tools right Script ------------------------------------------- */

	const HandleCanvasResize = (event) => {

        const action = event.target.value;

        const arr = arregloImg.map((el) => {
            if (el.selected === true) {

                switch (action) {

                    case 'heightPlus': {
                        console.log("sumado");
                        el.heightY = el.heightY + 15;
                        break;
                    }
                    case 'heightMinus': {
                        console.log("restado");
                        el.heightY = el.heightY - 15;
                        break;
                    }
                    case 'widthPlus': {
                        console.log("sumado");
                        el.widthX = el.widthX + 15;
                        break;
                    }
                    case 'widthMinus': {
                        console.log("restado");
                        el.widthX = el.widthX - 15;
                        break;
                    }

                    default: {
                        console.log("error");
                    }
                }


            }
            return el;
        })

        setArregloImg(arr);

    }

	const HandleInsertText=(event)=>{

		const arr = arregloTextTool.map((el) => {

            if (el.selected === true) {
                el.content = event.target.value;
            }
            return el;

        })

        setArregloTextTool(arr);
	}

	const HandleTextSelected = (id)=>{
		const newArregloTextTool = [...arregloTextTool];

        const item = newArregloTextTool.find((element) => element.id === id)


        item.selected = !item.selected;

        setArregloTextTool(newArregloTextTool);

        /**Esto es para que cada vez que seleccionemos un texto haga autofocus */
        inputName.current.focus();
	}

	const HandleNewTextTool=()=>{
		const newArregloTextTool = [...arregloTextTool];

        newArregloTextTool.push({
            id: uuidv4(), content: "Escribe el texto", selected: false
        })

        setArregloTextTool(newArregloTextTool);
	}

	const HandleRemoveSelectText= ()=>{

		const newArregloTextTool = arregloTextTool.filter((obj) => !obj.selected)


        setArregloTextTool(newArregloTextTool);
	}

	const HandleSelectShape = (id) => {//shape tool

        const newSShape = [...arregloShapeTool]
		const item = newSShape.find((element)=> element.id === id);

		arregloShape.push({id: uuidv4(), imageSRC: item.imageSRC, selected: false,
		widthX: 50, heightY: 50, rotate: 0});

		item.selected = !item.selected;

		setArregloShapeTool(newSShape);

    }

	const SelectedShapeBox=(id)=>{

		
		const newSShape = [...arregloShape]
		const item = newSShape.find((element)=> element.id === id);
		item.selected = !item.selected;

		setArregloShape(newSShape);

	}


	const HandleRotate=(e)=>{
		const newArr = [...arregloShape];
        const action = e.target.value;

		console.log("presionando");

        newArr.map((el) => {
            if (el.selected === true && action === "leftRotate") {
                el.rotate -= 6;
				console.log(el.rotate);
            }
            if (el.selected === true && action === "rightRotate") {
                el.rotate += 6;
				console.log(el.rotate);
            }

            return el;

        });

        setArregloShape(newArr);
	}

	const HandleRemoveShapeBox=()=>{

		const newArregloShape = arregloShape.filter((obj) => !obj.selected)

        setArregloShape(newArregloShape);
	}

	/**--------------------------------------------- Version ----------------------------------------------------------------- */

	const HandleVersion = () => {
		alert("-Responsive version -You can insert image by import button from local jpg files")
	}

	/**--------------------------------------------- Render HTML ----------------------------------------------------------------- */
	return (
		<div className="app">
			<div className="heading">Vision</div>
			<div>
				<input type="file" id="file" multiple onChange={handleImageChange} />

				<div className="label-holder">
					<label htmlFor="file" className="label">
						<i className="material-icons">add_a_photo</i>
					</label>
				</div>

				<div className='buttonToolsArea'>

					<button value="SeleccionarTodo" onClick={HandleSetElement}>Seleccionar Todo</button>

					<button value="QuitarSeleccion" onClick={HandleSetElement} >Quitar Seleccion </button>

					<button value="Borrarcontenido" onClick={HandleSetElement} >Borrar Contenido </button>

					<button value="CuadroMas" onClick={HandleAdd} >Cuadro ➕</button>

					<button value="CuadroMenos" onClick={HandleDelete} >Eliminar ➖</button>

					<button value="captura" onClick={HandleCapture} >Captura 📷</button>

					<button onClick={HandleVersion} >Version Alpha 1.0</button>


				</div>

				<div className='principalScreen'>

					<div className="result responsive">{renderPhotos(selectedFiles)}</div>

					<div className='rightToolsResponsive'>

					</div>

					<div className="frameWorkArea responsive">
						{<DivImageBox items={arregloImg} 
						HandleSelect={HandleSelect} 
						textItems={arregloTextTool} 
						selectedText={HandleTextSelected}
						shapeItems={arregloShape}
						selectedShapeBox={SelectedShapeBox}
						/>}
					</div>

					<aside className='rightTools res'>

						<div className='toolText'>
							<h6 className='title'>Textos:</h6>

							<div className='buttonsLayout'>
								<input onChange={HandleInsertText} type="text" className='inputTexto' placeholder='Escribe el Texto' ref={inputName} />
							</div>

							<DivInsertTextTool items={arregloTextTool} HandleTextSelected={HandleTextSelected} />


							<button value='add' onClick={HandleNewTextTool}>➕</button>
							<button value='delete' onClick={HandleRemoveSelectText}>🗑</button>

						</div>

						

						<div className='toolDimension'>

							<h6 className='title'>Alto</h6>
							<div className='buttonsLayout'>
								<button value='heightPlus' onClick={HandleCanvasResize}>➕</button>
								<button value='heightMinus' onClick={HandleCanvasResize}>➖</button>
							</div>

							<h6 className='title'>Ancho</h6>
							<div className='buttonsLayout'>
								<button value='widthPlus' onClick={HandleCanvasResize}>➕</button>
								<button value='widthMinus' onClick={HandleCanvasResize}>➖</button>
							</div>


						</div>

						

						<div className='toolForm'>

							<DivShapeTool items={arregloShapeTool} handleSelectShape={HandleSelectShape} />

							<button value='leftRotate' onClick={HandleRotate}>➕</button>
							<button value='rightRotate' onClick={HandleRotate}>➖</button>
							<button value='delete' onClick={HandleRemoveShapeBox}>🗑</button>

						</div>

					</aside>

					

				</div>

			</div>
		</div>
	);
};

export default App;
