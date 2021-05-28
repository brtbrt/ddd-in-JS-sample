.PHONY: build

PRICES_STATS_BACK_NAME := app-prices-stats

.PHONY: up-app-prices-stats-backend
up-app-prices-stats-backend:
	docker-compose up $(PRICES_STATS_BACK_NAME)-backend

.PHONY: watch-app-prices-stats-backend
watch-app-prices-stats-backend:
	docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn watch-app-prices-stats-backend

.PHONY: terminal-app-prices-stats-backend
terminal-app-prices-stats-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend bash

.PHONY: add-dep-prices-stats-backend
add-dep-prices-stats-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn add $(package)

.PHONY: add-flow-type-prices-stats-backend
add-flow-type-prices-stats-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn flow-typed install $(package) --typescript

.PHONY: create-stub-flow-type-prices-stats-backend
create-stub-flow-type-prices-stats-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn flow-typed create-stub $(package)
