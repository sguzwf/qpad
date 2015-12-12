var UI=require("gui2d/ui");
var W=require("gui2d/widgets");
require("gui2d/dockbar");
require("res/lib/code_editor");
require("res/lib/subwin");

UI.ChooseScalingFactor({designated_screen_size:1080})
UI.SetFontSharpening(1);
(function(){
	UI.pixels_per_unit_base=UI.pixels_per_unit
	UI.pixels_per_unit*=(UI.m_ui_metadata.zoom||1)
	UI.ResetRenderer(UI.pixels_per_unit);
})();
//UI.SetFontSharpening(0)
UI.fallback_font_names=["res/fonts/dsanscn.ttc"]
UI.icon_font_name='res/fonts/iconfnt.ttf,!'
UI.Theme_CustomWidget=function(C){
	var C_dark=UI.lerp_rgba(C[0],0xff000000,0.15)
	var C_sel=UI.lerp_rgba(C[0],0xffffffff,0.66)
	var custom_styles={
		tooltip:{
			font:UI.Font(UI.font_name,24,-50),
			padding:8,
			spacing:8,
			color:0xffffffff,
			round:8,
			border_color:0xff000000,
			border_width:1,
			text_color:0xff000000,
			shadow_size:6,
			shadow_color:0xaa000000,
			triangle_font:UI.Font("res/fonts/dsanscn.ttc,!",32,0),
			triangle_font2:UI.Font("res/fonts/dsanscn.ttc,!",32,250),
		},
		sub_window:{
			transition_dt:0.1,
			round:0,border_width:2,
			padding:4,h_caption:24,
			/////////////////
			layout_direction:"inside",layout_align:'left',layout_valign:'up',
			/////////////////
			font:UI.Font(UI.font_name,20,100),
			color:0xffffffff,border_color:C[0],border_width:2,
			caption_color:C[0],text_color:0xffdddddd,
			button_style:{
				transition_dt:0.1,
				round:0,border_width:2,padding:8,
				border_width:0,color:0,
				text_color:0xffdddddd,
				font:UI.Font(UI.font_name,20,100),
				$:{
					out:{
						text_color:0xffdddddd
					},
					over:{
						text_color:0xffffffff,
					},
					down:{
						text_color:0xffffffff,
					},
				}
			},
		},
		tab_label:{
			transition_dt:0.1,
			shadow_size:8,
			hotkey_font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,10,0):UI.Font(UI.font_name,12,0),
			font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,22,-50):UI.Font(UI.font_name,24,-50), padding:16,
			$:{
				active:{
					text_color:0xffffffff,
					color:C[0],
					shadow_color:0xaa000000,
				},
				inactive:{
					text_color:0xff000000,
					color:C[0]&0x00f0f0f0,
					shadow_color:0x00000000, 
				},
			}
		},
		tabbed_document:{
			transition_dt:0.1,
			h_caption:32, h_bar:4, color:0xffbbbbbb, border_color:C[0],
			w_menu_button:26,
			h_menu_button:26,
			padding:4,
			menu_bar_color:[{x:0,y:0,color:0xffffffff},{x:0,y:1,color:0xffe8e8e8}],
			menu_bar_border_width:0,
			menu_bar_border_color:0xffaaaaaa,
			menu_bar_shadow_size:8,
			menu_bar_shadow_color:0xaa000000,
			menu_button_style:{
				transition_dt:0.25,
				round:0,padding:0,
				color:0,
				$:{
					out:{
						text_color:0xffaaaaaa,
					},
					over:{
						text_color:C[0],
					},
					down:{
						text_color:UI.lerp_rgba(C[0],0xff000000,0.2),
					},
					checked_out:{
						text_color:C[0],
					},
					checked_over:{
						text_color:C[0],
					},
					checked_down:{
						text_color:UI.lerp_rgba(C[0],0xff000000,0.2),
					},
				}
			},
		},
		save_dialog:{
			transition_dt:0.1,
			color:0x00d0d0d0,
			$:{
				active:{
					color:0x7f000000,
				},
				inactive:{
					color:0x00000000,
				},
			},
			///////////
			shadow_color:0xff000000,
			shadow_size:32,
			border_color:0xff444444,
			border_width:0,
			round_dlg_rect:32,
			space_dlg_rect_x:48,
			space_dlg_rect:32,
			color_dlg_rect:0xf0ffffff,
			font_text:UI.Font(UI.font_name,40,-50),
			text_color:0xff000000,
			font_buttons:UI.Font(UI.font_name,28,-50),
			space_middle:32,
			space_button:80,
			h_button:48,
			good_button_style:{
				transition_dt:0.1,
				round:32,border_width:0,padding:24,
				$:{
					out:{
						color:[{x:0,y:0,color:UI.lerp_rgba(C[0],0xffffffff,0.2)},{x:0,y:1,color:UI.lerp_rgba(C[0],0xff000000,0.1)}],
						icon_color:0xfff0f0f0,
						text_color:0xfff0f0f0,
					},
					over:{
						color:[{x:0,y:0,color:UI.lerp_rgba(C[0],0xffffffff,0.4)},{x:0,y:1,color:UI.lerp_rgba(C[0],0xffffffff,0.1)}],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					down:{
						color:[{x:0,y:0,color:UI.lerp_rgba(C[0],0xffffffff,0.1)},{x:0,y:1,color:UI.lerp_rgba(C[0],0xff000000,0.2)}],
						icon_color:0xfff0f0f0,
						text_color:0xfff0f0f0,
					},
				}
			},
			bad_button_style:{
				transition_dt:0.1,
				round:32,border_width:0,padding:24,
				$:{
					out:{
						color:[{x:0,y:0,color:0xff999999},{x:0,y:1,color:0xff666666}],
						icon_color:0xfff0f0f0,
						text_color:0xfff0f0f0,
					},
					over:{
						color:[{x:0,y:0,color:0xffaaaaaa},{x:0,y:1,color:0xff7f7f7f}],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					down:{
						color:[{x:0,y:0,color:0xff888888},{x:0,y:1,color:0xff555555}],
						icon_color:0xfff0f0f0,
						text_color:0xfff0f0f0,
					},
				}
			},
		},
		box_document:{
			border_color:(0xccffffff&C[0]),border_width:2,w_snapping_line:2,
			color:(0x44ffffff&C[0]),
		},
		txtx_editor:{
			border_color:0xff000000,border_width:2,
			color:0xffffffff,
		},
		color_picker:{
			w_text:16,w_slider:128,w_edit:54,
			h_slider:12,
			h_edit:32,
			h_space:24,
			padding:8,
			border_width:1.5,
			border_color:0xff444444,
			text_color:0xff000000,
			font:UI.Font(UI.font_name,24),
		},
		demo_document:{
			thumbnail_style:{
				border_color:0xff000000,
				border_width:1.5,
				text_color:0xff000000,
				sel_border_color:C[0],
				sel_border_width:3,
				sel_text_color:C[0],
				font:UI.Font(UI.font_name,24),
				text_padding:4,
			},
			new_page_button_style:{
				transition_dt:0.1,
				round:0,border_width:3,padding:0,color:0,
				font:UI.Font(UI.font_name,72,-50),
				$:{
					out:{
						border_color:0x80000000,
						icon_color:0x80000000,
						text_color:0x80000000,
					},
					over:{
						border_color:0xaa000000,
						icon_color:0xaa000000,
						text_color:0xaa000000,
					},
					down:{
						border_color:0xaa000000,
						icon_color:0xaa000000,
						text_color:0xaa000000,
					},
				},
			},
		},
		style_item:{
			border_color:0,border_width:0,
			color:0x00000000,
			padding:4,
			$:{
				focus:{
					color:C_sel,
				},
				blur:{
					color:0x00000000,
				}
			}
		},
		code_editor:{
			editor_style:{
				//wrap_width:1536,
				//font:UI.Font("res/fonts/inconsolata.ttf",36),
				//font_emboldened:UI.Font("res/fonts/inconsolata.ttf",36,200),
				//tex_font:UI.Font("res/fonts/cmunrm.ttf",36),
				//tex_font_emboldened:UI.Font("res/fonts/cmunrm.ttf",36,200),
				//font_tilde:UI.Font(UI.icon_font_name,36,100),
				font:UI.Font("res/fonts/inconsolata.ttf",28),
				font_emboldened:UI.Font("res/fonts/inconsolata.ttf",28,200),
				tex_font:UI.Font("res/fonts/cmunrm.ttf",28,0),
				tex_font_emboldened:UI.Font("res/fonts/cmunrm.ttf",28,200),
				font_tilde:UI.Font(UI.icon_font_name,28,100),
				//font:UI.Font("res/fonts/inconsolata.ttf",32),
				//font_emboldened:UI.Font("res/fonts/inconsolata.ttf",32,200),
				//tex_font:UI.Font("res/fonts/cmunrm.ttf",32),
				//tex_font_emboldened:UI.Font("res/fonts/cmunrm.ttf",32,200),
				//font_tilde:UI.Font(UI.icon_font_name,32,100),
				color:0xff000000,
				color2:0xff000000,
				color_normal:0xff000000,
				color_overlay:0xff7f7f7f,
				color_string:0xff1c1aa3,
				color_number:0xff1c1aa3,
				color_comment:0xff2ca033,
				color_keyword:0xffb4771f,
				color_type:0xffbc470f,
				color_symbol:0xff7f7f7f,
				color_symbol2:0xff7f7f7f,
				color_meta:0xff9a3d6a,
				/////////////
				color_key_decl_func:0xff845717,//0xff5a3b0f,
				color_key_decl_class:0xffbc470f,
				color_key_decl_macro:0xff9a3d6a,
				/////////////
				//virtual hyphen for tex-like files, should be even less obvious than normal symbols
				color_hyphen:0xffaaaaaa,
				color_tilde_spell_error:0xff1c1aa3,
				color_tilde_compiler_error:0xff1c1aa3,
				color_tilde_compiler_warning:0xff2ca033,
				/////////////
				color_completing_bracket:0x80999999,
				color_auto_edit_range_highlight:0x4099ffff,
				color_strikeout:0x80444444,
				color_virtual_diff_bold:0xff1c1aa3,
				/////////////
				bgcolor_ellipsis:[{x:0,y:0,color:0xffffffff},{x:1,y:1,color:C_sel}],
				w_ellipsis:32,
				padding_ellipsis:2,
				h_ellipsis:20,
				/////////////
				bgcolor_selection:C[0]&0x55ffffff,
				tab_width:4,
				scroll_transition_dt:0.075,
				/////////////
				//rectex_styles:[{color:0,w:32,h:32,round:8,border_width:3,border_color:0xff1c1aa3}],
				rectex_styles:[{color:0x7f00ffff,w:32,h:32,round:8,border_width:-8}],
			},
			bgcolor:0xffe8e8e8,
			padding:6,
			separator_color:0xff999999,
			///////
			show_top_hint:1,
			top_hint_shadow_color:0x7f000000,
			top_hint_shadow_size:8,
			top_hint_border_width:2,
			top_hint_border_color:0xffaaaaaa,
			top_hint_max_lines:3,
			top_hint_max_levels:20,
			x_scroll_shadow_color:0x7f000000,
			x_scroll_shadow_size:8,
			///////
			show_line_numbers:1,
			line_number_font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,12,-50):UI.Font(UI.font_name,14,-50),
			line_number_bgcolor:0xffd0d0d0,
			line_number_color:0xff7f7f7f,
			line_number_color_focus:0xff000000,
			color_cur_line_highlight:0x55ffffff,
			///////
			bookmark_font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,10,200):UI.Font(UI.font_name,12,200),
			bookmark_color:[{x:0,y:0,color:0xffffffff},{x:1,y:1,color:C_sel}],
			bookmark_text_color:C[0],
			//bookmark_shadow:0xff000000,
			bookmark_border_color:C[0],
			bookmark_scroll_bar_marker_size:2,
			///////
			//color_diff_tag:[{x:0,y:0,color:0xff2ca033&0xffffff},{x:1,y:0,color:0xff2ca033}],
			color_diff_tag:[{x:0,y:0,color:0x002ca033},{x:1,y:0,color:0xff2ca033}],
			sbar_diff_color:(0xff2ca033),
			///////
			show_minimap:(UI.Platform.ARCH=="linux32"||UI.Platform.ARCH=="android"||UI.Platform.ARCH=="ios")?0:1,
			minimap_font_height:6,
			minimap_page_shadow:0x1f000000,
			minimap_page_border_width:2,
			minimap_page_border_color:0xffaaaaaa,
			sbar_eye_font:UI.Font(UI.icon_font_name,12,200),
			sbar_page_shadow:0xaa444444,
			sbar_page_border_color:0xff444444,
			sbar_page_border_width:1,
			w_minimap:128,
			///////
			disclaimer_transition_dt:0.1,
			disclaimer_color:0xff1c1aa3,
			h_find_bar:32,
			find_bar_bgcolor:0xffffffff,
			find_bar_color:0xffe8e8e8,
			find_bar_round:8,
			find_bar_padding:4,
			find_bar_hint_color:0xff7f7f7f,
			find_bar_shadow_color:0x7f000000,
			find_bar_shadow_size:8,
			find_bar_hint_font:UI.Font(UI.font_name,20,-50),
			find_bar_button_size:28,
			find_bar_editor_style:{
				font:UI.Font("res/fonts/inconsolata.ttf",20),
				tex_font:UI.Font("res/fonts/cmunrm.ttf",20),
				font_emboldened:UI.Font("res/fonts/inconsolata.ttf",20,200),
				tex_font_emboldened:UI.Font("res/fonts/cmunrm.ttf",20,200),
				//font_tilde:UI.Font(UI.icon_font_name,28,100),
				font_tilde:UI.Font(UI.icon_font_name,26,100),
				color:0xff000000,
				color_overlay:0xff000000,
				color_string:0xff1c1aa3,
				color_number:0xff1c1aa3,
				color_comment:0xff2ca033,
				color_keyword:0xffb4771f,
				color_type:0xffbc470f,
				color_symbol:0xff7f7f7f,
				rectex_styles:[{color:0}],
				bgcolor_selection:C[0]&0x55ffffff,
				tab_width:4,
			},
			find_item_scale:0.8,
			find_item_expand_current:4,//in lines
			find_item_separation:6,
			find_item_border_width:0,
			find_item_border_color:0xff444444,
			find_item_shadow_color:0x7f000000,
			find_item_shadow_size:4,
			find_mode_bgcolor:0xffc0c0c0,
			//find_item_replace_highlight_color:0x55007fff,
			find_message_font:UI.Font(UI.font_name,32,-50),
			find_message_color:0xff444444,
			///////
			show_auto_completion:1,
			accands_font:UI.Font(UI.font_name,22,-50),
			accands_id_font:UI.Font(UI.font_name,12,200),
			accands_padding:24,
			accands_left_padding:14,
			accands_sel_padding:2,
			accands_shadow_color:0x7f000000,
			accands_shadow_size:8,
			accands_bgcolor:0xffffffff,
			accands_round:4,
			accands_border_width:0,
			accands_border_color:0xff000000,
			accands_text_color:0xff000000,
			accands_text_sel_color:0xffffffff,
			accands_sel_bgcolor:C[0],
			accands_n_shown:5,
			autoedit_button_size:24,
			autoedit_button_padding:2,
			//w_accands:512,
			h_accands:32,
			///////
			w_scroll_bar:20,
			scroll_bar_style:{
				transition_dt:0.1,
				//bgcolor:0xffd0d0d0,
				round:0,
				padding:0,
				szbar_min:32,
				middle_bar:{
					w:12,h:12,
					round:6,
					color:0,
					border_color:0,
				},
				icon_color:0xff999999,
				text_color:0xff999999,//dummy
				$:{
					out:{
						icon_color:[{x:0,y:0,color:0x00999999},{x:1,y:1,color:0x00666666}],
						text_color:0x00999999,//dummy
					},
					over:{
						icon_color:[{x:0,y:0,color:0xff999999},{x:1,y:1,color:0xff666666}],
						text_color:0xff999999,//dummy
					},
				},
			},
			///////
			w_notification:340,
			dx_shake_notification:-300,
			///////
			sxs_shadow_size:6,
			sxs_shadow_color:0xaa000000,
			///////
			status_bar_bgcolor:[{x:0,y:0,color:0xffffffff},{x:0,y:1,color:0xffd0d0d0}],
			status_bar_font:UI.Font(UI.font_name,20,-50),
			status_bar_padding:4,
			status_bar_text_color:0xff444444,
			///////
			wrap_bar_size:3,
			wrap_bar_region_size:8,
			wrap_bar_color:0x2f000000,
		},
		code_editor_notification:{
			transition_dt:0.1,
			padding:6,
			w_icon:24,
			w_text:300,
			shadow_size:8,
			shadow_color:0xff000000,
			color:0xffffffff,
			border_color:0xff000000,
			border_width:0,
			round:4,
			text_color:0xff444444,
			progress_color:C_sel,
			font:UI.Font(UI.font_name,20,0),
			icon_color:0xff000000,
			icon_font:UI.Font('res/fonts/iconfnt.ttf,!',20),
			icon:'告',
			//////////
			k_shake:400,
			damping_shake:8,
			x_min_shake:0.5,
			dx_min_shake:0.5,
		},
		sxs_build_output:{
			border_width:0,
			color:0xffffffff,
			editor_style:{
				font:UI.Font("res/fonts/inconsolata.ttf",16,-50),
				font_emboldened:UI.Font("res/fonts/inconsolata.ttf",16,100),
				scroll_transition_dt:0.1,
				bgcolor_selection:C_sel,
				color:0xff000000,
				state_handlers:["renderer_programmer","colorer_programmer","line_column_unicode","seeker_indentation"],
				read_only:1,
				$:{
					focus:{
						bgcolor_selection:C_sel,
					},
					blur:{
						bgcolor_selection:0xffcccccc,
					},
				}
			},
		},
		sxs_new_page:{
			color:0xffffffff,
			border_color:0xff000000,
			border_width:0,
			round:0,
			//////////////////////
			h_find_bar:32,
			find_bar_bgcolor:0xffffffff,
			find_bar_color:0xffe8e8e8,
			find_bar_round:8,
			find_bar_padding:4,
			find_bar_hint_color:0xff7f7f7f,
			find_bar_shadow_color:0x7f000000,
			find_bar_shadow_size:8,
			find_bar_hint_font:UI.Font(UI.font_name,20,-50),
			find_bar_button_size:28,
			find_bar_editor_style:{
				font:UI.Font("res/fonts/inconsolata.ttf",20),
				color:0xff000000,
				bgcolor_selection:C[0]&0x3fffffff,
				tab_width:4,
			},
		},
		file_item:{
			h:56,h_dense:32,
			h_icon:48,
			icon_font:UI.Font(UI.icon_font_name,48),
			h_icon_dense:28,
			icon_font_dense:UI.Font(UI.icon_font_name,28),
			h_icon_git:16,
			icon_font_git:UI.Font(UI.icon_font_name,16),
			file_icon_color:0xff444444,
			name_font_size:UI.Platform.ARCH=="mac"?20:24,
			name_font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,20,-50):UI.Font(UI.font_name,24,-50),
			name_font_bold:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,20,100):UI.Font(UI.font_name,24,100),
			misc_font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,16,-50):UI.Font(UI.font_name,18,-50),
			name_color:0xff000000,
			misc_color:0xff7f7f7f,
			basepath_color:0xffcccccc,
			sel_bgcolor:C[0],
			sel_file_icon_color:0xffffffff,
			sel_name_color:0xffffffff,
			sel_misc_color:0xffcccccc,
			sel_basepath_color:0xffcccccc,
			tag_padding:4,
			tag_round:8,
			tag_border_width:0,
			color_git_untracked:0xff9a3d6a,
			color_git_conflicted:0xff1c1ae3,
			color_git_new:0xff2ca033,
			color_git_modified:UI.lerp_rgba(0xff000000,0xff1c1ae3,0.5),
			button_style:{
				transition_dt:0.1,
				round:0.1,border_width:1,padding:4,
				font:UI.Font(UI.font_name,24,-50),
				icon_font:UI.Font(UI.icon_font_name,18),
				$:{
					out:{
						//border_color:0xff444444,color:0xffffffff,
						border_color:0,color:[{x:0,y:0,color:C[0]},{x:0,y:1,color:C[0]}],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					over:{
						border_color:0xff444444,color:[{x:0,y:0,color:0xffffffff},{x:0,y:1,color:0xffe8e8e8}],
						icon_color:0xff000000,
						text_color:0xff000000,
					},
					down:{
						border_color:0xff7f7f7f,color:[{x:0,y:0,color:0xff7f7f7f},{x:0,y:1,color:0xff7f7f7f}],
						icon_color:0xff000000,
						text_color:0xff000000,
					},
				}
			},
		},
		top_menu:{
			//nothing
		},
		top_menu_item:{
			font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,20,-50):UI.Font(UI.font_name,22,-50),
			padding:8,
			$:{
				active:{
					color:C[0],
					text_color:0xffffffff,
				},
				inactive:{
					color:0,
					text_color:0xff000000,
				},
			},
		},
		fancy_menu:{
			color:0xffe8e8e8,
			border_color:0xff444444,
			border_width:1,round:1,
			shadow_color:0xaa000000,
			shadow_size:12,
			///////////
			font:UI.Platform.ARCH=="mac"?UI.Font(UI.font_name,20,-50):UI.Font(UI.font_name,22,-50),
			text_color:0xff000000,
			text_sel_color:0xffffffff,
			icon_color:C[0],
			hotkey_color:0xff7f7f7f,
			hotkey_sel_color:0xffaaaaaa,
			sel_bgcolor:C[0],
			///////////
			vertical_padding:4,
			side_padding:8,
			column_padding:32,
			button_padding:4,
			///////////
			h_separator:8,
			h_separator_fill:1,
			separator_color:0xffd0d0d0,
			h_menu_line:32,
			h_button:28,
			w_icon:24,
			checkbox_bgcolor:[{x:0,y:0,color:0xffffffff},{x:0,y:1,color:0xffe8e8e8}],
			button_style:{
				transition_dt:0.1,
				round:0.1,border_width:1,padding:0,
				font:UI.Font(UI.font_name,20,-50),
				icon_font:UI.Font(UI.icon_font_name,18),
				$:{
					out:{
						//border_color:0xff444444,color:0xffffffff,
						border_color:0xff444444,color:[{x:0,y:0,color:0xffffffff},{x:0,y:1,color:0xffe8e8e8}],
						icon_color:0xff000000,
						text_color:0xff000000,
					},
					over:{
						border_color:C[0],color:C[0],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					down:{
						border_color:C_dark,color:C_dark,
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					checked_out:{
						border_color:C[0],color:C[0],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					checked_over:{
						border_color:C[0],color:C[0],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
					checked_down:{
						border_color:C[0],color:C[0],
						icon_color:0xffffffff,
						text_color:0xffffffff,
					},
				}
			},
		},
		scroll_bar:{
			transition_dt:0.1,
			//bgcolor:0xffd0d0d0,
			round:0,
			padding:0,
			szbar_min:32,
			middle_bar:{
				w:8,h:8,
				round:6,
				color:[{x:0,y:0,color:0xff999999},{x:1,y:1,color:0xff666666}],
				border_color:0,
			},
			text_color:0xff999999,//dummy
		},
	};
	var s0=UI.default_styles;
	for(var key in custom_styles){
		s0[key]=custom_styles[key]
	}
}
UI.icon_font=UI.Font(UI.icon_font_name,24);
UI.icon_font_20=UI.Font(UI.icon_font_name,20);
if(UI.Platform.ARCH=="mac"){
	UI.font_name="LucidaGrande,res/fonts/opensans.ttf"
	UI.eng_font_name="res/fonts/opensans.ttf,!"
}else{
	UI.font_name="res/fonts/opensans.ttf"
	UI.eng_font_name="res/fonts/opensans.ttf,!"
}
if(UI.Platform.BUILD=="debug"){
	UI.Theme_Minimalistic([0xff3377cc])
}else{
	UI.Theme_Minimalistic([0xffcc7733])
}
UI.SetRetardedWindingOrder(UI.core_font_cache['res/fonts/iconfnt.ttf']);

if(UI.Platform.ARCH=="mac"){
	UI.g_hotkey_map={
		"CTRL+N":"WIN+N",
		"CTRL+O":"WIN+O",
		"CTRL+W":"WIN+W",
		"CTRL+S":"WIN+S",
		"SHIFT+CTRL+S":"SHIFT+WIN+S",
		////////////////
		"CTRL+C":"WIN+C",
		"CTRL+V":"WIN+V",
		"SHIFT+CTRL+V":"SHIFT+WIN+V",
		"CTRL+X":"WIN+X",
		"CTRL+Z":"WIN+Z",
		"SHIFT+CTRL+Z":"SHIFT+WIN+Z",
		"CTRL+A":"WIN+A",
		"CTRL+L":"WIN+L",
		"CTRL+T":"WIN+T",
		"SHIFT+CTRL+T":"SHIFT+WIN+T",
		"CTRL+K":"WIN+K",
		"SHIFT+CTRL+U":"SHIFT+WIN+U",
		"CTRL+D":"WIN+D",
		"SHIFT+CTRL+D":"SHIFT+WIN+D",
		"SHIFT+CTRL+W":"SHIFT+WIN+W",
		////////////////
		"SHIFT+CTRL+O":"SHIFT+WIN+O",
		"ALT+Q":"SHIFT+WIN+O",
		"ALT+C":"CTRL+C",
		"ALT+H":"CTRL+H",
		"ALT+E":"CTRL+E",
		////////////////
		"CTRL+F":"WIN+F",
		"CTRL+G":"WIN+G",
		////////////////
		"F7":"SHIFT+WIN+B",
		"CTRL+F5":"SHIFT+WIN+R",
		////////////////
		"CTRL+LEFT SHIFT+CTRL+LEFT":"ALT+LEFT SHIFT+ALT+LEFT",
		"CTRL+RIGHT SHIFT+CTRL+RIGHT":"ALT+RIGHT SHIFT+ALT+RIGHT",
		"ALT+LEFT":"WIN+LEFT",
		"ALT+RIGHT":"WIN+RIGHT",
		"CTRL+UP":"WIN+UP",
		"CTRL+DOWN":"WIN+DOWN",
		////////////////
		"CTRL+SHIFT+TAB":"SHIFT+WIN+LEFT",
		"CTRL+TAB":"SHIFT+WIN+RIGHT",
	}
}else{
	UI.g_hotkey_map={}
}
UI.TranslateHotkey=function(s){
	return UI.g_hotkey_map[s]||s;
}

var g_all_document_windows=[];
UI.g_all_document_windows=g_all_document_windows
UI.NewTab=function(tab){
	var current_tab_id=g_all_document_windows.length-1;
	if(UI.top.app.document_area&&UI.top.app.document_area.current_tab_id!=undefined){
		current_tab_id=UI.top.app.document_area.current_tab_id;
	}
	var new_tab_id=current_tab_id+1;
	if(new_tab_id<g_all_document_windows.length){
		var n=g_all_document_windows.length;
		var area=UI.top.app.document_area;
		for(j=n;j>new_tab_id;j--){
			area[j]=area[j-1];
			g_all_document_windows[j]=g_all_document_windows[j-1];
		}
		area[new_tab_id]=undefined;
		g_all_document_windows[new_tab_id]=tab;
		area.current_tab_id=new_tab_id;
	}else{
		g_all_document_windows.push(tab);
		UI.top.app.document_area.current_tab_id=g_all_document_windows.length-1;
	}
	UI.Refresh()
	return tab;
}

var ZOOM_RATE=1.0625
UI.UpdateZoom=function(){
	UI.ResetRenderer(UI.pixels_per_unit);
	UI.Refresh()
	UI.m_ui_metadata.zoom=(UI.pixels_per_unit/UI.pixels_per_unit_base)
}
UI.ZoomRelative=function(rate){
	UI.pixels_per_unit*=rate;
	UI.UpdateZoom()
}
UI.ZoomReset=function(){
	UI.pixels_per_unit=UI.pixels_per_unit_base
	UI.UpdateZoom()
}

UI.BeforeGC=function(){
	UI.ED_IndexGC();
};

var g_app_inited=0;
UI.Application=function(id,attrs){
	attrs=UI.Keep(id,attrs);
	UI.Begin(attrs);
		///////////////////
		var app=UI.Begin(W.Window('app',{
				title:'QPad',w:1280,h:720,bgcolor:0xfff0f0f0,icon:"res/icon256.png",
				flags:UI.SDL_WINDOW_MAXIMIZED|UI.SDL_WINDOW_RESIZABLE,
				is_main_window:1,
				OnWindowBlur:function(){
					this.document_area.OnWindowBlur();
				},
				OnMenu:function(){
					this.document_area.OnMenu();
				},
				OnClose:function(){
					return this.document_area.OnClose();
				}}));
			if(UI.Platform.ARCH!="mac"&&UI.Platform.ARCH!="ios"){
				W.Hotkey("",{key:"ALT+F4",action:function(){if(!app.OnClose()){UI.DestroyWindow(app)}}});
			}
			var w_property_bar=320;
			//UI.Platform.ARCH=='android'?(app.w<app.h?'down':'left'):
			//var obj_panel=W.AutoHidePanel("property_panel",{
			//	x:0,y:0,w:w_property_bar,h:w_property_bar,initial_position:0,
			//	max_velocity:16000,acceleration:10000,velocity_to_target_threshold:0.005,
			//	anchor_placement:'right',//(app.w<app.h?'down':'right'),
			//	knob_size:UI.IS_MOBILE?40:4,
			//});
			//var reg_panel=UI.context_regions.pop()
			//var panel_placement=obj_panel.anchor_placement
			UI.document_property_sheet={};
			//if(panel_placement=='down'){
			//	W.TabbedDocument("document_area",{
			//		'anchor':'parent','anchor_align':"fill",'anchor_valign':"up",
			//		'x':0,'y':0,'h':obj_panel.y,
			//		items:g_all_document_windows,
			//		Close:function(){UI.DestroyWindow(app)},
			//	})
			//}else{
			W.TabbedDocument("document_area",{
				'anchor':'parent','anchor_align':"left",'anchor_valign':"fill",
				'x':0,'y':0,'w':app.w,//obj_panel.x,
				items:g_all_document_windows,
				Close:function(){UI.DestroyWindow(app)},
			})
			//}
			var property_windows=[]
			if(app.document_area.active_tab){
				property_windows=(app.document_area.active_tab.property_windows||property_windows);
			}
			//UI.context_regions.push(reg_panel)
			//////////////////////////
			//var w_shadow=6
			//var w_bar=4;
			//var shadow_color=0xaa000000
			//if(panel_placement=='down'){
			//	UI.RoundRect({
			//		x:-w_shadow,y:obj_panel.y-w_bar-w_shadow,w:app.w+w_shadow*2,h:w_shadow*2,
			//		color:shadow_color,border_width:-w_shadow,round:w_shadow,
			//	})
			//	UI.RoundRect({
			//		x:0,y:obj_panel.y-w_bar,w:app.w,h:w_property_bar,
			//		color:0xfff0f0f0,border_width:0,
			//	})
			//	W.Group("property_bar",{
			//		'anchor':obj_panel,'anchor_align':"fill",'anchor_valign':"up",
			//		'x':0,'y':0,'h':w_property_bar,
			//		item_template:{'object_type':W.SubWindow},items:property_windows,
			//		///////////
			//		'layout_direction':'right','layout_spacing':0,'layout_align':'left','layout_valign':'fill',
			//		'property_sheet':UI.document_property_sheet,
			//	});
			//	W.RoundRect("",{
			//		'anchor':obj_panel,'anchor_align':"fill",'anchor_valign':"up",
			//		'x':0,'y':-w_bar,'h':w_bar,
			//		'color':UI.current_theme_color,
			//	})
			//}else{
			//UI.RoundRect({
			//	x:obj_panel.x-w_bar-w_shadow,y:-w_shadow,w:w_shadow*2,h:app.h+w_shadow*2,
			//	color:shadow_color,border_width:-w_shadow,round:w_shadow,
			//})
			//UI.RoundRect({
			//	x:obj_panel.x-w_bar,y:0,w:w_property_bar,h:app.h,
			//	color:0xfff0f0f0,border_width:0,
			//})
			//W.Group("property_bar",{
			//	'anchor':obj_panel,'anchor_align':"left",'anchor_valign':"fill",
			//	'x':0,'y':0,'w':w_property_bar,
			//	item_template:{'object_type':W.SubWindow},items:property_windows,
			//	///////////
			//	'layout_direction':'down','layout_spacing':0,'layout_align':'fill','layout_valign':'up',
			//	'property_sheet':UI.document_property_sheet,
			//});
			//W.RoundRect("",{
			//	'anchor':obj_panel,'anchor_align':"left",'anchor_valign':"fill",
			//	'x':-w_bar,'y':0,'w':w_bar,
			//	'color':UI.current_theme_color,
			//})
			//}
			//////////////////////////
			var menu_file=UI.BigMenu("&File")
			menu_file.AddNormalItem({text:"&New",icon:'新',key:"CTRL+N",enable_hotkey:1,action:function(){
				var active_document=UI.top.app.document_area.active_tab
				if(active_document&&active_document.main_widget&&active_document.main_widget.m_is_brand_new){
					app.document_area.CloseTab();
				}
				UI.UpdateNewDocumentSearchPath()
				UI.NewCodeEditorTab()
				UI.Refresh()
			}})
			menu_file.AddNormalItem({text:"&Open",icon:'开',key:"CTRL+O",enable_hotkey:1,action:function(){
				//var fn=IO.DoFileDialog(["Text documents (*.text)","*.text","All File","*.*"]);
				//if(!fn){return;}
				UI.UpdateNewDocumentSearchPath()
				var fn=IO.DoFileDialog(["All File","*.*"],UI.m_new_document_search_path+"/*");
				if(!fn){return;}
				UI.OpenFile(fn);
				UI.Refresh()
			}});
			menu_file.AddNormalItem({text:"&Save",key:"CTRL+S",icon:'存',enable_hotkey:1,action:function(){
				app.document_area.SaveCurrent();
			}});
			menu_file.AddNormalItem({text:"Save &as...",key:"SHIFT+CTRL+S",enable_hotkey:1,action:function(){
				app.document_area.SaveAs();
			}});
			menu_file.AddNormalItem({text:"Save a&ll",icon:'保',action:function(){
				app.document_area.SaveAll();
			}});
			if(app.document_area.active_tab){
				menu_file.AddNormalItem({text:"&Close",key:"CTRL+W",enable_hotkey:0,action:function(){
					app.document_area.CloseTab();
				}});
				menu_file.AddSeparator();
				menu_file.AddNormalItem({text:"Revert changes",action:function(){
					var obj_tab=app.document_area.active_tab;
					if(obj_tab&&obj_tab.Reload){obj_tab.Reload();};
				}});
			}
			menu_file.AddSeparator();
			var fopen_brand_new=function(force_mode){
				var active_document=UI.top.app.document_area.active_tab
				if(active_document&&active_document.main_widget&&active_document.main_widget.m_is_brand_new){
					//repeated alt+q
					if(!force_mode||force_mode!=UI.m_ui_metadata.new_page_mode){
						if(force_mode){
							UI.m_ui_metadata.new_page_mode=force_mode;
						}else{
							if(UI.m_ui_metadata.new_page_mode=='fs_view'){
								UI.m_ui_metadata.new_page_mode='hist_view';
							}else{
								UI.m_ui_metadata.new_page_mode='fs_view';
							}
						}
						if(active_document.main_widget.sxs_visualizer){
							var obj_find_bar_edit=active_document.main_widget.sxs_visualizer.find_bar_edit;
							if(obj_find_bar_edit){
								if(obj_find_bar_edit.OnDestroy){obj_find_bar_edit.OnDestroy();}
								active_document.main_widget.sxs_visualizer.find_bar_edit=undefined;
							}
							active_document.main_widget.sxs_visualizer.m_file_list=undefined;
						}
					}
					UI.Refresh()
					return;
				}
				UI.UpdateNewDocumentSearchPath()
				var tab=UI.NewCodeEditorTab();
				tab.auto_focus_file_search=1
				tab.title=UI._("New Tab");
				UI.Refresh()
			};
			menu_file.AddNormalItem({icon:"时",text:"Recen&t...",
				key:UI.m_ui_metadata.new_page_mode!='fs_view'?"ALT+Q":"ALT+Q,Q",
				enable_hotkey:0,action:fopen_brand_new.bind(undefined,'hist_view')})
			menu_file.AddNormalItem({text:"&Browse...",
				key:UI.m_ui_metadata.new_page_mode=='fs_view'?"ALT+Q":"ALT+Q,Q",
				enable_hotkey:0,action:fopen_brand_new.bind(undefined,'fs_view')})
			menu_file.AddNormalItem({text:"Arrange tabs",
				enable_hotkey:0,action:function(){UI.top.app.document_area.ArrangeTabs();}})
			//obj.ArrangeTabs.bind(obj.current_tab_id)
			W.Hotkey("",{key:"ALT+Q",action:fopen_brand_new})
			if(UI.m_closed_windows&&UI.m_closed_windows.length>0){
				menu_file.AddNormalItem({text:"Restore closed",key:"SHIFT+CTRL+T",enable_hotkey:1,action:function(){
					if(UI.m_closed_windows.length>0){
						var active_document=UI.top.app.document_area.active_tab
						var fn=UI.m_closed_windows.pop();
						if(active_document&&active_document.main_widget&&active_document.main_widget.m_is_brand_new){
							UI.top.app.document_area.CloseTab();
						}
						if(g_all_document_windows.length>0){
							//hack: put the tab at the end of it
							UI.top.app.document_area.current_tab_id=g_all_document_windows.length-1;
						}
						UI.OpenEditorWindow(fn);
						UI.Refresh();
					}
				}})
			}
			menu_file.AddSeparator();
			W.Hotkey("",{key:"CTRL+-",action:function(){UI.ZoomRelative(1/ZOOM_RATE)}});
			W.Hotkey("",{key:"CTRL+0",action:function(){UI.ZoomReset()}});
			W.Hotkey("",{key:"CTRL+=",action:function(){UI.ZoomRelative(ZOOM_RATE)}});
			menu_file.AddButtonRow({icon:"扩",text:"Zoom (@1%)".replace("@1",(UI.pixels_per_unit/UI.pixels_per_unit_base*100).toFixed(0))},[
				{text:"-",tooltip:'CTRL -',action:function(){
					UI.ZoomRelative(1/ZOOM_RATE)
				}},{text:"100%",tooltip:'CTRL+0',action:function(){
					UI.ZoomReset()
				}},{text:"+",tooltip:'CTRL +',action:function(){
					UI.ZoomRelative(ZOOM_RATE)
				}}])
			if(!UI.Platform.IS_MOBILE){
				//OS shell
				menu_file.AddSeparator();
				menu_file.AddNormalItem({text:"Open shell (&D)...",icon:'控',enable_hotkey:0,action:function(){
					UI.UpdateNewDocumentSearchPath()
					if(UI.Platform.ARCH=="win32"||UI.Platform.ARCH=="win64"){
						IO.Shell(["start"," ","cmd","/k","cd","/d",UI.m_new_document_search_path])
					}else if(UI.Platform.ARCH=="linux32"||UI.Platform.ARCH=="linux64"){
						IO.Shell(["xterm",
							"-e",'cd '+UI.m_new_document_search_path+'; bash'])
					}else{
						//mac
						//http://stackoverflow.com/questions/7171725/open-new-terminal-tab-from-command-line-mac-os-x
						IO.Shell(["osascript",
							"-e",'tell application "Terminal" to activate'])
						IO.Shell(["osascript",
							"-e",'tell application "System Events" to delay 0.1'])
						IO.Shell(["osascript",
							"-e",'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'])
						IO.Shell(["osascript",	
							"-e",'tell application "Terminal" to do script "cd '+UI.m_new_document_search_path+'" in selected tab of the front window'])
					}
				}})
			}
			menu_file.AddSeparator();
			menu_file.AddNormalItem({text:"E&xit",action:function(){
				if(!app.OnClose()){UI.DestroyWindow(app)}
			}});
			menu_file=undefined;
			//if(!UI.m_current_file_list){
			//	UI.ClearFileListingCache();
			//}
		UI.End();
	UI.End();
	if(!g_app_inited){
		var workspace=UI.m_ui_metadata["<workspace>"]
		var fn_current_tab=UI.m_ui_metadata["<current_tab>"]
		if(workspace){
			var current_tab_id=undefined
			for(var i=0;i<workspace.length;i++){
				UI.NewCodeEditorTab(workspace[i])
				if(workspace[i]==fn_current_tab){
					current_tab_id=i;
				}
			}
			if(current_tab_id!=undefined){
				UI.top.app.document_area.SetTab(current_tab_id)
				UI.top.app.document_area.n_tabs_last_checked=g_all_document_windows.length
			}
			UI.InvalidateCurrentFrame();
			UI.Refresh()
		}
		g_app_inited=1
	}
	if(!g_all_document_windows.length){
		if(app.quit_on_zero_tab){
			if(!app.OnClose()){UI.DestroyWindow(app)}
			return;
		}
		//UI.NewUIEditorTab()
		//UI.NewCodeEditorTab()
		//UI.OpenFile("c:/tp/kara/ide/edcore.spap")
		//UI.OpenFile("c:/h/edtest/empty.tex")
		//UI.OpenFile("c:/tp/papers/ours/vg2015/gpu_scanline.tex")
		//UI.OpenFile("C:/tp/qpad/history.xml")
		//UI.NewFromTemplate("templates/blank_demo.mo")
		//c:\tp\pure\mo\pm_tmp\win32\mo\s7main.c
		//UI.OpenFile("C:/h/syousetu/stars_tr.md")
		//UI.OpenFile("c:/h/edtest/crap.c")
		//UI.UpdateNewDocumentSearchPath()
		UI.m_new_document_search_path=IO.GetNewDocumentName(undefined,undefined,"document");
		UI.m_previous_document=undefined
		UI.NewCodeEditorTab().auto_focus_file_search=1
		UI.InvalidateCurrentFrame()
		UI.Refresh()
		app.quit_on_zero_tab=1;
	}
	if(UI.Platform.BUILD=="debug"){
		//detect memory leaks
		W.Hotkey("",{key:"SHIFT+CTRL+L",action:function(){
			UI.BeforeGC()
			Duktape.gc()
			UI.dumpMemoryUsage();
			UI.detectLeaks();
		}});
		W.Hotkey("",{key:"SHIFT+CTRL+M",action:function(){
			print("=== manual gc call")
			UI.BeforeGC()
			Duktape.gc()
			UI.debugDumpHeap()
			UI.debugDumpFragmentation()
		}});
	}
};

UI.Run();

