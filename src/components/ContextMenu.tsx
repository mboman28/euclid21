export {}
// import { useEffect, useRef, useState } from "react";
// import { Html } from 'react-konva-utils'

// type ContextMenuProps = {
//     menu: any;
//     children: React.ReactElement;
// }

// const ContextMenu: React.FC<ContextMenuProps> = ({ menu, children }) => {
//     const menuRef = useRef()
//     const [open, setOpen] = useState<boolean>(false);
//     const [location, setLocation] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

//     const onClickOff = (event: MouseEvent) => {
//         if (menuRef !== null // &&
//             // event.target !== menuRef &&
//             // !menuRef.contains(event.target as Node)
//         ) {
//             setOpen(false);
//         }
//     };

//     const onRightClick = (x: number, y: number) => {
//         setOpen(true);
//         setLocation({ x: x, y: y });
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', onClickOff);
//         return () => {
//             window.removeEventListener('mousedown', onClickOff)
//         }
//     })

//     return (
//         <Html></Html>
//     )

//     // return (
//         //             <div>
//         //                 {React.cloneElement(children, {
//         //                     onContextMenu: (e: any) => {
//         //                         const event = e.evt
//         //                         console.log(event)
//         //                         event.preventDefault()
//         //                         // this.onRightClick(event.pageX, event.pageY);
//         //                     },
//         //                 })}
//         //                 {this.state.open && (
//         //                     <div
//         //                         ref={menu => {
//         //                             if (menu) {
//         //                                 this.menuRef = menu;
//         //                             }
//         //                         }}
//         //                         style={{
//         //                             position: 'absolute',
//         //                             left: this.state.location.x,
//         //                             top: this.state.location.y,
//         //                             margin: 0,
//         //                             padding: 0,
//         //                         }}
//         //                         {...rest}
//         //                     >
//         //                         {menu}
//         //                     </div>
//         //                 )}
//         //             </div>
//         //         );
// }

// export default ContextMenu;

// // import * as React from 'react';

// // interface Props {
// //     menu: any;
// //     children: React.ReactElement;
// // }

// // interface State {
// //     open: boolean;
// //     location: {
// //         x: number;
// //         y: number;
// //     };
// // }

// // export default class ContextMenu extends React.Component<Props, State> {
// //     menuRef: HTMLDivElement | null = null;

// //     state: State = {
// //         open: false,
// //         location: {
// //             x: 0,
// //             y: 0,
// //         },
// //     };

// //     componentDidMount() {
// //         document.addEventListener('mousedown', this.onClickOff);
// //     }

// //     componentWillUnmount() {
// //         document.removeEventListener('mousedown', this.onClickOff);
// //     }

// //     onClickOff = (event: MouseEvent) => {
// //         if (
// //             this.menuRef !== null &&
// //             event.target !== this.menuRef &&
// //             !this.menuRef.contains(event.target as Node)
// //         ) {
// //             this.setState({
// //                 open: false,
// //             });
// //         }
// //     };

// //     onRightClick = (x: number, y: number) => {
// //         this.setState(() => ({
// //             open: true,
// //             location: {
// //                 x,
// //                 y,
// //             },
// //         }));
// //     };

// //     render() {
// //         const { children, menu, ...rest } = this.props;
// //         return (
// //             <div>
// //                 {React.cloneElement(children, {
// //                     onContextMenu: (e: any) => {
// //                         const event = e.evt
// //                         console.log(event)
// //                         event.preventDefault()
// //                         // this.onRightClick(event.pageX, event.pageY);
// //                     },
// //                 })}
// //                 {this.state.open && (
// //                     <div
// //                         ref={menu => {
// //                             if (menu) {
// //                                 this.menuRef = menu;
// //                             }
// //                         }}
// //                         style={{
// //                             position: 'absolute',
// //                             left: this.state.location.x,
// //                             top: this.state.location.y,
// //                             margin: 0,
// //                             padding: 0,
// //                         }}
// //                         {...rest}
// //                     >
// //                         {menu}
// //                     </div>
// //                 )}
// //             </div>
// //         );
// //     }
// // }