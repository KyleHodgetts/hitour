# Version 1.0
# Datum model that can belong to numerous points on different tours
# Datums can have multiple audiences
class Datum < ActiveRecord::Base
	validates :title, presence: :true, uniqueness: true
	validates :description, presence: :true
	has_many :points, through: :point_data, dependent: :destroy
	has_many :audiences, through: :data_audiences
	has_many :data_audiences
	has_many :point_data

	auto_strip_attributes :title, squish: true
end
