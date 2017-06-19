Unit.prototype.update = function() {
	var self = this;

	self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

	if(self.units.length < self.settings.unitMaximum) {
		if(Math.random() <= self.settings.creationFactor) {
			self.addUnit({
				x: self.canvas.width * Math.random(),
				y: self.canvas.height
			});
		}
	}

	for(var idx in self.units) {
		self.units[idx].cals = false;
	}

	for(var idx in self.units) {
		var collapsed = false;

		var unit = self.units[idx];
		var afterUnitPosition = {
			x: unit.x + unit.velocity.x,
			y: unit.y - unit.velocity.y,
		};

		if(unit.cals === false) {
			// Skip of pre-calculated units.

			for(var key in self.units) {
				if(key === idx) {
					continue;
				}

				var item = self.units[key];
				var afterItemPosition = {
					x: item.x + item.velocity.x,
					y: item.y - item.velocity.y,
				};

				var distanceUnits = Math.sqrt(Math.pow(afterItemPosition.x - afterUnitPosition.x, 2) + Math.pow(afterItemPosition.y - afterUnitPosition.y, 2), 2);
				var sumRadius = item.radius + unit.radius;

				if(distanceUnits < sumRadius) {
					collapsed = true;

					var afterVelocity1 = self.getVelocity(unit, item);
					var afterVelocity2 = self.getVelocity(item, unit);

					unit.velocity.x = afterVelocity1.x;
					unit.velocity.y = afterVelocity1.y;
					item.velocity.x = afterVelocity2.x;
					item.velocity.y = afterVelocity2.y;

					unit.cals = true;
					item.cals = true;

					break;
				}
			}
		}

		if(
			unit.x + unit.velocity.x <= 0 ||
			unit.x + unit.velocity.x + unit.radius >= self.canvas.width
		) {
      collapsed = true;
			unit.velocity.x *= -1;
		}
		
		if(unit.y - unit.velocity.y < 0) {
			if(unit.bounceCount > 5) {
				self.units.splice(idx, 1);
				continue;
			} else {
        collapsed = true;
				unit.velocity.y *= -self.settings.corFactor;
				unit.bounceCount += 1;
			}
		} else {
			unit.velocity.y += self.settings.gravity;
		}
		
		unit.x += unit.velocity.x;
		unit.y -= unit.velocity.y;

		self.context.beginPath();
		self.context.arc(unit.x, self.canvas.height - unit.y, unit.radius * unit.mass, 0, 2 * Math.PI, false);

		if(collapsed === true) {
			self.context.fillStyle = 'red';
		} else {
			self.context.fillStyle = 'black';
		}

		self.context.fill();
		self.context.closePath();
	}

	self.context.font = '14px nanum gothic';
	self.context.fillStyle = '#000000';
	self.context.fillText((parseInt(1000 / (new Date().getTime() - this.l)) + ' fps'), this.w - 50, 20);
	self.lastTime = new Date().getTime();

	window.requestAnimationFrame(function() {
		self.update.call(self);
	});
}