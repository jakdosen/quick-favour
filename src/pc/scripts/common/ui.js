/**
 * Created by Gavin Li on 12/5/2017.
 */
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

export const Dialog = Backbone.View.extend({
	initialize(){
		this.render()
	},
	template:_.template(`
		<div> <%=header%>  </div>
	`),
	render(){
		this.$el.append(this.template({header:'test'}))
	}
});